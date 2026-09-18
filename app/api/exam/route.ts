import { NextResponse } from "next/server";
import { db } from "@/db";
import { examDetailsTable } from "@/db/schema/candidate";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const isArray = Array.isArray(body);
    const items = isArray ? body : [body];

    if (items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Exam list cannot be empty" },
        { status: 400 }
      );
    }

    // Validate each item
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.date && !/^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
        return NextResponse.json(
          { success: false, error: `Invalid date format at index ${i}. Use YYYY-MM-DD` },
          { status: 400 }
        );
      }
    }

    const recordsToInsert = items.map((item) => ({
      name: item.name ?? null,
      post: item.post ?? null,
      date: item.date ?? null,
      time: item.time ?? null,
      reporting: item.reporting ?? null,
      center: item.center ?? null,
    }));

    const inserted = await db
      .insert(examDetailsTable)
      .values(recordsToInsert)
      .returning();

    return NextResponse.json(
      {
        success: true,
        count: inserted.length,
        data: isArray ? inserted : inserted[0],
      },
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
