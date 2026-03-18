import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSession } from "@/lib/auth";
import { getActiveSubscription } from "@/lib/db";
import { cookies } from "next/headers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    // Auth via Supabase admin
    const { data: authData, error } = await supabase.auth.admin.listUsers();
    if (error) return NextResponse.json({ error: "Auth error" }, { status: 500 });
    
    const user = authData.users.find(u => u.email === email);
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    
    // Check subscription
    const product = process.env.NEXT_PUBLIC_PRODUCT_SLUG!;
    const sub = await getActiveSubscription(email, product);
    if (!sub) return NextResponse.json({ error: "No active subscription. Please purchase access." }, { status: 403 });
    
    const token = await createSession({
      id: user.id, email, product,
      subscriptionId: sub.id, status: sub.status
    });
    
    cookies().set("hdv_session", token, {
      httpOnly: true, secure: true, sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, path: "/"
    });
    
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
