import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.errors[0]?.message }, { status: 400 });
    }
    // TODO: write to Supabase registrations table + send Resend confirmation email
    return NextResponse.json({
      message: "Registration submitted! Check your email for confirmation.",
      data: parsed.data,
    });
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
