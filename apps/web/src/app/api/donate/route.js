import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { amount = 500, currency = "inr" } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: "Donation to Shoonya",
              description:
                "Support your teacher and the transformation journey",
            },
            unit_amount: amount * 100, // paise / cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_CREATE_APP_URL}/donate/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_CREATE_APP_URL}/donate/cancel`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Stripe donate error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
