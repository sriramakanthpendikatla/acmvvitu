import { NextResponse } from "next/server";
import { allEvents } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ events: allEvents });
}
