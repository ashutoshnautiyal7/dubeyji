
import { db } from "@/lib/db";
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from "next/server";


export async function PATCH  (
    req:Request,
    {params}: {params: {patientId: string}}
) {
    try{

        const { name, email, phone, gender, address, status , remark, age, doad, dood, dx, surgery, side, ipdReg, bill, implant } = await req.json();

        

        const lead = await db.lead.update({
            where: {
                id: params.patientId,
            },
            data:{
                name,
                email, 
                phone, 
                gender, 
                address, 
                status, 
                remark ,  
                age,
                doad,
                dood, 
                dx, 
                surgery,
                side,
                ipdReg,
                bill,
                implant
            }
    })

    return NextResponse.json(lead);

    }
    catch(err){
        console.log("lead ID PATCH",err);
        return new NextResponse("Internal error", {status: 500})
    }

}