import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vvkdnzqgtajeouxlliuk.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a2RuenFndGFqZW91eGxsaXVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTAwOTE4NiwiZXhwIjoyMDg2NTg1MTg2fQ.Q61WGhT0KHUbrVc3FiRzQN-vhmy53dEqaad4w4c_Z9o";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

export async function getUserByEmail(email: string) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  return data;
}

export async function getActiveSubscription(email: string, product: string) {
  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("customer_email", email)
    .eq("source_product", product)
    .eq("status", "active")
    .single();
  return data;
}

export async function createSubscriptionRecord(data: {
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  customerEmail: string;
  product: string;
}) {
  const { error } = await supabase.from("subscriptions").insert({
    stripe_subscription_id: data.stripeSubscriptionId,
    stripe_customer_id: data.stripeCustomerId,
    customer_email: data.customerEmail,
    vertical: "daas",
    tier: "COMMAND",
    interval: "month",
    source_product: data.product,
    status: "active",
  });
  return !error;
}
