
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Create Supabase client
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  try {
    const payload = await req.json();
    
    // Extract payment details from IntaSend webhook
    const { 
      invoice, 
      state, 
      value, 
      customer_data,
      account 
    } = payload;

    if (state === "COMPLETE") {
      // Record payment in the database
      const { data, error } = await supabase
        .from('payments')
        .insert({
          transaction_ref: invoice.invoice_id,
          amount: value,
          status: 'completed',
          course_id: customer_data?.course_id || null,
          user_id: account?.customer_id || null,
          paid_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error recording payment:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Create enrollment record if course_id is available
      if (customer_data?.course_id) {
        const { error: enrollmentError } = await supabase
          .from('enrollments')
          .insert({
            course_id: customer_data.course_id,
            student_id: account?.customer_id || null,
            enrolled_at: new Date().toISOString(),
          });

        if (enrollmentError) {
          console.error('Error creating enrollment:', enrollmentError);
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
