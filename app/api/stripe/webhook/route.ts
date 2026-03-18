import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createSubscriptionRecord } from "@/lib/db";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
  
  if (event.type === "customer.subscription.created" || event.type === "checkout.session.completed") {
    const data = event.data.object as any;
    const email = data.customer_email || data.metadata?.customer_email;
    const product = data.metadata?.product || process.env.NEXT_PUBLIC_PRODUCT_SLUG!;
    
    if (email) {
      await createSubscriptionRecord({
        stripeSubscriptionId: data.subscription || data.id,
        stripeCustomerId: data.customer,
        customerEmail: email,
        product,
      });
    }
  }
  
  return NextResponse.json({ received: true });
}
