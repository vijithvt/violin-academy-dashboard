
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@1.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TrialRequest {
  name: string;
  email: string;
  studentName: string;
  course: string;
  mobileNumber: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY") || "");
    const { name, email, studentName, course, mobileNumber }: TrialRequest = await req.json();
    
    // Map course code to readable name
    let courseName = "1-to-1 Online Course";
    if (course === "batch_class") courseName = "Online Batch Class";
    if (course === "home_tuition") courseName = "Home Tuition";

    // Send email to admin
    const { data, error } = await resend.emails.send({
      from: "Violin Academy <onboarding@resend.dev>",
      to: "vijithviolinist@gmail.com",
      subject: `New Free Trial Request: ${studentName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6c1c1c;">New Free Trial Request</h2>
          <p>A new free trial request has been submitted:</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Parent/Guardian:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${mobileNumber}</p>
            <p><strong>Student Name:</strong> ${studentName}</p>
            <p><strong>Course:</strong> ${courseName}</p>
          </div>
          
          <div style="margin-top: 20px;">
            <p>Please contact them to schedule their free trial class.</p>
          </div>
          
          <p style="margin-top: 40px; font-size: 12px; color: #666;">
            This is an automated notification from your Violin Academy website.
          </p>
        </div>
      `,
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    // Also send confirmation email to the requester
    await resend.emails.send({
      from: "Violin Academy <onboarding@resend.dev>",
      to: email,
      subject: "Your Free Trial Class Request - Vijith Violinist Academy",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6c1c1c;">Thank You for Your Interest!</h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for your interest in our Carnatic violin classes. We have received your request for a free trial class for ${studentName}.</p>
          
          <p>Our team will contact you shortly to schedule your free trial class and answer any questions you may have.</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #6c1c1c; margin-top: 0;">Request Details:</h3>
            <p><strong>Student Name:</strong> ${studentName}</p>
            <p><strong>Course:</strong> ${courseName}</p>
          </div>
          
          <p>If you have any immediate questions, please feel free to contact us:</p>
          <ul>
            <li>Phone: +91 9496315903</li>
            <li>WhatsApp: +91 8301815324</li>
            <li>Email: vijithviolinist@gmail.com</li>
          </ul>
          
          <p>We're excited to begin this musical journey with you!</p>
          
          <p>Best regards,<br>Vijith VT<br>Carnatic Violin Academy</p>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 500,
      }
    );
  }
});
