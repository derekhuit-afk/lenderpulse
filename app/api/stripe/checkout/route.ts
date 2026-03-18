import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const product = process.env.NEXT_PUBLIC_PRODUCT_SLUG!;
    const priceId = process.env.STRIPE_PRICE_ID!;
    const origin = req.headers.get("origin") || "https://" + process.env.NEXT_PUBLIC_SUBDOMAIN;
    
    const session = await createCheckoutSession({
      email, priceId, product,
      successUrl: `${origin}/dashboard?success=true`,
      cancelUrl: `${origin}/?cancelled=true`,
    });
    
    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
