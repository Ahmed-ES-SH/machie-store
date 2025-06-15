import Stripe from "stripe";
import { NextResponse } from "next/server";

// Initialize Stripe client with secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    // Parse JSON body from request
    const { productName, amount, currency, quantity } = await request.json();

    // Validate required fields
    if (!productName || !amount || !currency || !quantity) {
      return NextResponse.json(
        { error: "Incomplete payment data" },
        { status: 400 }
      );
    }

    // Create Stripe checkout session with dynamic data
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: productName,
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity,
        },
      ],
      success_url: `https://machie-store.vercel.app/paymentsuccess?payment_status=success&product=${encodeURIComponent(
        productName
      )}&amount=${amount}&productLength=${quantity}`,
      cancel_url: `https://machie-store.vercel.app/paymentfaild?payment_status=success&amount=${amount}&productLength=${quantity}`,
    });

    // Return the session ID to the client
    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe Error:", err);
    return NextResponse.json(
      { error: "Failed to create payment session" },
      { status: 500 }
    );
  }
}
