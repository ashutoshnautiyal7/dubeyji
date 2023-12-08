import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { formatISO } from "date-fns"; // Import the necessary date-fns function

export async function POST(req: Request) {
  try {
    const { selectedDates } = await req.json();

    // Format the selected dates to ISO format
    const formattedDates = selectedDates.map((date: any) => formatISO(new Date(date)));

    // Create closed days in the database
    const closedDays = await Promise.all(
      formattedDates.map(async (date: any) => {
        const closedDay = await db.closedDay.create({
          data: {
            date: new Date(date),
          },
        });
        return closedDay;
      })
    );

    return NextResponse.json(closedDays);
  } catch (err) {
    console.error("CLOSED_DAYS_CREATE", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
