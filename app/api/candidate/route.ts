import { NextResponse } from "next/server";
import { db } from "@/db";
import { candidateTable } from "@/db/schema/candidate";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const required = ["name", "roll", "fathers_name", "address", "phone", "category", "email", "dob"];
    for (const field of required) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(body.dob)) {
      return NextResponse.json(
        { success: false, error: "Invalid dob format. Use YYYY-MM-DD" },
        { status: 400 }
      );
    }

    const inserted = await db
      .insert(candidateTable)
      .values({
        exam_id: body.exam_id ?? null,
        name: body.name,
        roll: body.roll,
        fathers_name: body.fathers_name,
        address: body.address,
        phone: body.phone,
        category: body.category,
        email: body.email,
        dob: body.dob,
        eligiblity: body.eligiblity ?? null,
        signature: body.signature ?? null,
        profile: body.profile ?? null,
      })
      .returning();

    return NextResponse.json(
      { success: true, data: inserted[0] },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error inserting candidate:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const records = await db.select().from(candidateTable);
    return NextResponse.json({ success: true, data: records });
  } catch (error: any) {
    console.error("Error fetching candidates:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
