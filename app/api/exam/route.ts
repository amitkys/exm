import { NextResponse } from "next/server";
import { db } from "@/db";
import { examDetailsTable } from "@/db/schema/candidate";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate date format (YYYY-MM-DD)
    if (body.date && !/^\d{4}-\d{2}-\d{2}$/.test(body.date)) {
      return NextResponse.json(
        { success: false, error: "Invalid date format. Use YYYY-MM-DD" },
        { status: 400 }
      );
    }

    const inserted = await db
      .insert(examDetailsTable)
      .values({
        name: body.name ?? null,
        post: body.post ?? null,
        date: body.date ?? null,
        time: body.time ?? null,
        reporting: body.reporting ?? null,
        center: body.center ?? null,
      })
      .returning();

    return NextResponse.json(
      { success: true, data: inserted[0] },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error inserting exam details:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const records = await db.select().from(examDetailsTable);
    return NextResponse.json({ success: true, data: records });
  } catch (error: any) {
    console.error("Error fetching exam details:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
