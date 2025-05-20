
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const INTASEND_API_KEY = Deno.env.get("INTASEND_API_KEY");
const BASE_URL = "https://sandbox.intasend.com/api/v1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, currency, email, phoneNumber, firstName, lastName, courseId } = await req.json();

    // Call IntaSend API to create a checkout
    const response = await fetch(`${BASE_URL}/checkout/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${INTASEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_key: Deno.env.get("INTASEND_PUBLISHABLE_KEY"),
        amount: amount,
        currency: currency || "KES",
        email: email,
        phone_number: phoneNumber,
        first_name: firstName,
        last_name: lastName,
        payment_method: "MPESA",
        customer_data: {
          course_id: courseId
        }
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
