import { NextResponse } from "next/server";
import { db } from "../../db";
import { players } from "../../db/schema";
import { desc } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 10;
    const offset = Number(searchParams.get("offset")) || 0;

    // Fetch players with pagination
    const playersList = await db
      .select()
      .from(players)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(players.name));

    return NextResponse.json({
      players: playersList,
      metadata: {
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
