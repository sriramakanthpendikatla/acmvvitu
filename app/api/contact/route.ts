import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Validation failed" }, { status: 400 });
    }
    // TODO: forward to Resend or store in site_meta / notifications table
    return NextResponse.json({ message: "Message received" });
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
