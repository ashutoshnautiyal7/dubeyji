"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GenderType, LeadStatus } from "@prisma/client";
import {format} from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";

const formSchema = z.object({
  template: z.string(),
  
});


export const SendAppointmentReminder = () => {
  
  const { isOpen, onClose, type, data } = useModal();
  const [count, setCount] = useState(0);
  const router = useRouter();
  const params = useParams();

  const header = {
   headers:{
    Authorization: process.env.NEXT_PUBLIC_WHATSAPP_TOKEN,
    Accept: "application/json"
    
   } 
  }

  const isModalOpen = isOpen && type === "sendAppointmentReminder";

    

  const onSubmit = async () => {
  try {
      for (const row of data.template) {
      const body = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: row.original?.phone,
        type: "template",
        template: {
          name: "booking_confirmation",
          language: {
            code: "en_US"
          },
          components: [
            {
                type: "body",
                parameters: [
                {
                    type: "text",
                    text: row.original?.name
                },
                {
                    type: "text",
                    text: row.original?.date
                },
                {
                    type: "text",
                    text: row.original?.time
                },

                
                    
                ]
        
            }
    ]
    }}

      
      await axios.post("https://graph.facebook.com/v17.0/177309328798172/messages", body, header);
      setCount(count + 1)   
      console.log("hello", count)
      
      
    }
}
 catch (error) {
    console.log(error);
  }
 
};
  

  const handleClose = () => {
    console.log(count)
    onClose();
  }

  

  return (
    
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
            {
                count === 0 ? (
                    <DialogTitle className="text-3xl text-center font-bold m-4">
                        Send Appointment Reminder to {data.template?.length} clients
                    </DialogTitle>
                ) : 
                (
                    <DialogTitle className="text-3xl text-center font-bold m-4">
                        {count} of {data.template?.length} messages successfully sent
                    </DialogTitle>
                )
            }
          
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4 flex text-center">
              <Button variant="primary" className={cn(count === 0 ? "" : "hidden")} onClick={onSubmit}>
                Send
              </Button>
              {/* <Button variant="destructive" onClick={handleClose} disabled={isLoading} className="text-center text-xl">
                Close
              </Button> */}
            </DialogFooter>
         
       
      </DialogContent>
    </Dialog>

    
  )
}
