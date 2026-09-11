import { NextResponse } from "next/server";
import { getBookableSuiteIds } from "@/lib/suite-availability";

export async function GET() {
  const availability = await getBookableSuiteIds();
  return NextResponse.json({
    availability,
    both: availability["unit-a"] && availability["unit-b"],
  });
}
