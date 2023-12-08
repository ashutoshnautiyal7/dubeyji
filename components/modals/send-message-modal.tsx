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

const formSchema = z.object({
  template: z.string()
  
});


export const SendMessageModal = () => {
  
  
  const { isOpen, onClose, type, data } = useModal();
  const templates = ["hello_world", "personalized_message"]


  const header = {
   "headers":{
    Authorization: process.env.NEXT_PUBLIC_WHATSAPP_TOKEN,
    Accept: "application/json"
    
   } 
  }

  const isModalOpen = isOpen && type === "sendMessage";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:  {
      template: "",
    }
  });

  

  const isLoading = form.formState.isSubmitting;
  

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
 try {
    if(values.template.toLowerCase() === "personalized_message"){
      const body = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: data.recipent?.phone,
        type: "template",
        template: {
          name: values.template.toLowerCase(),
          language: {
            code: "en_US"
          },
          components: [
            {
                type: "body",
                parameters: [
                {
                    type: "text",
                    text: data.recipent?.name
                },
                ]
        
            }
    ]
    }}

      await axios.post("https://graph.facebook.com/v17.0/177309328798172/messages", body, header);
}
    else{
        
      const body = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: data.recipent?.phone,
        type: "template",
        template: {
          name: "hello_world",
          language: {
            code: "en_US"
          },
        }
      };

      await axios.post("https://graph.facebook.com/v17.0/177309328798172/messages", body, header);
    }
    form.reset();
    onClose();
  } catch (error) {
    console.log(error);
  }
};
  

  const handleClose = () => {
    form.reset();
    onClose();
  }

  return (
    
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Send Message to {data.recipent?.name}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              {/* <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    Phone number
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      
                      {...field}
                      type="text"
                      //@ts-ignore
                      
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
                <FormField
                control={form.control}
                name="template"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Templates</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none"
                        >
                          <SelectValue placeholder="Select Template" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(templates).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="capitalize"
                          >
                            {type.toLowerCase()}
                            
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button className="mt-10" variant="primary" disabled={isLoading}>
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>

    
  )
}
