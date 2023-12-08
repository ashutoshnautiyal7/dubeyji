// @ts-nocheck

"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Appointment, GenderType, LeadStatus } from "@prisma/client";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect, useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { ScrollArea } from "@/components//ui/scroll-area";
import { Lead } from "@prisma/client";
import { type } from "os";

interface AddpatientProps {
  initialData: Lead | Appointment | null;
  type: "lead" | "appointment";
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Patient name is required.",
  }),
  email: z.string(),
  phone:
    z.string().min(1, {
      message: "phone is required",
    }) || null,
  age: z.number().lte(150).positive(),
  gender: z.nativeEnum(GenderType),
  address: z.string().min(1, {
    message: "address is required.",
  }),
  status: z.nativeEnum(LeadStatus),
  remark: z.string(),
  doad: z.string().transform((str) => new Date(str)),
  dood: z.string().transform((str) => new Date(str)),
  dx: z.string(),
  surgery: z.string(),
  side: z.string(),
  implant: z.string(),
  ipdReg : z.number(),
  bill: z.number(),
});

type AddpatientFormValues = z.infer<typeof formSchema>;

const Addpatient: React.FC<AddpatientProps> = ({ initialData, type }) => {
  const router = useRouter();
  const params = useParams();
  const [isloading, setLoading] = useState(false);

  const toastMessage = initialData ? "Patient updated." : "Patient created.";

  const form = useForm<AddpatientFormValues>({
    resolver: zodResolver(formSchema),
    // @ts-ignore
    defaultValues: initialData || {
      name: "",
      email: "",
      phone: "",
      age: z.EMPTY_PATH,
      gender: GenderType.M,
      address: "",
      status: LeadStatus.PENDING,
      remark: "",
      doad: new Date().toISOString().split("T")[0],
      dood: new Date().toISOString().split("T")[0],
      dx: "",
      surgery: "",
      side: "",
      implant: "",
      ipdReg : z.number(),
      bill: z.number(),
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (type === "lead") {  
        await axios.patch(`/api/patients/${initialData.id}`, values);
      } 
      else {
        await axios.post(`/api/patients`, values);       
      }
      form.reset();
      router.refresh();
      router.push(`/admin/patients`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    
  };

  useEffect(() => {
    if(initialData?.doad){
      form.setValue("doad", format(new Date(initialData.doad), "yyyy-MM-dd"));
    }
  }, [form, initialData?.doad]);

  useEffect(() => {
    if(initialData?.dood){
      form.setValue("dood", format(new Date(initialData.dood), "yyyy-MM-dd"));
    }
  }
  , [form, initialData?.dood]);



  return (
    <div>
      <h2 className="text-3xl font-bold mb-5 m-10">Add New Patient</h2>
        <ScrollArea className="container mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-8 px-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm font-bold text-black dark:text-white">
                    Patient name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-transparent border border-primary focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white"
                      placeholder="Enter Patient name"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm font-bold text-black dark:text-white">
                    Enter email
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-transparent border border-primary focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white"
                      placeholder="Enter email"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm font-bold text-black dark:text-white">
                    Phone number
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-transparent border border-primary focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white"
                      placeholder="Enter Phone number"
                      {...field}
                      type="phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm font-bold text-black dark:text-white">
                    Age
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-transparent border border-primary focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white"
                      placeholder="Enter Patient's age"
                      {...field}
                      {...form.register("age", { valueAsNumber: true })}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm font-bold text-black dark:text-white">
                    Gender
                  </FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-transparent border border-primary focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none dark:text-white">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(GenderType).map((type) => (
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
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm font-bold text-black dark:text-white">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-transparent border border-primary focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white"
                      placeholder="Enter Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            
            <FormField
              control={form.control}
              name="doad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm font-bold text-black dark:text-white">
                    D.O.Ad
                  </FormLabel>
                  
                  <FormControl> 
                    < Input           
                      disabled={isLoading}
                      className="bg-transparent border border-primary focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white"
                      placeholder="Enter D.O.Ad"
                      type="date"
                      {...field}
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm font-bold text-black dark:text-white">
                    D.O.Op
                  </FormLabel>
                  
                  <FormControl>
                    
                    <Input                  
                      disabled={isLoading}
                      className="bg-transparent border border-primary focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white"
                      placeholder="Enter D.O.Op"
                      {...field}
                      type="date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                        <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm font-bold text-black dark:text-white">
                    Lead Status
                  </FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-transparent border border-primary focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none dark:text-white">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(LeadStatus).map((type) => (
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
            <FormField
              control={form.control}
              name="remark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm font-bold text-black dark:text-white">
                    remarks
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-transparent border border-primary focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white"
                      placeholder="Enter Remarks"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="dx"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm font-bold text-black dark:text-white">
                    description
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-transparent border border-primary focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white"
                      placeholder="Enter a Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="surgery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm font-bold text-black dark:text-white">
                    surgery
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-transparent border border-primary focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white"
                      placeholder="Enter name for Surgery"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="side"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm font-bold text-black dark:text-white">
                    side
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-transparent border border-primary focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white"
                      placeholder="Enter side"
                      {...field}
                    />
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                         <FormField
              control={form.control}
              name="implant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm font-bold text-black dark:text-white">
                    impant
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-transparent border border-primary focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white"
                      placeholder="Enter implant"
                      {...field}
                    />
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
               <FormField
              control={form.control}
              name="ipdReg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm font-bold text-black dark:text-white">
                    ipd reg
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-transparent border border-primary focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white"
                      placeholder="Enter IPD Reg Number"
                      {...field}
                      {...form.register("ipdReg", { valueAsNumber: true })}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
               <FormField
              control={form.control}
              name="bill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm font-bold text-black dark:text-white">
                    bill
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-transparent border border-primary focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white"
                      placeholder="Enter Bill amount"
                      {...field}
                      {...form.register("bill", { valueAsNumber: true })}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />                      
          </div>

          <DialogFooter className=" px-6 py-4">
            <Button variant="primary" disabled={isLoading}>
              {
                type === "lead" ? "Update" : "Add Lead"
              }
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </ScrollArea>
    </div>
    
  );
};

export default Addpatient;