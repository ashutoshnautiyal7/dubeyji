import { db } from "@/lib/db";
import { InitialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
     { params }: { params: { userId: string } }
)

{  
  try{ 
    const profile = await InitialProfile();
    const { values, date, time , appointment } = await req.json();

     
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const booking  = await db.appointment.create({
      data:{
        userId: appointment.userId,
        name: appointment.name,
        phone: appointment.phone,
        age:  appointment.age,
        address: appointment.address,
        gender : appointment.gender,
        date,
        time,
        email: appointment.email,
        description: values.description,
      }
})
      
      return NextResponse.json(booking);
  } catch (error) {
    console.log("[CHANNEL_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}