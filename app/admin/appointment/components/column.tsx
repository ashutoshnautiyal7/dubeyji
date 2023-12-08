"use client"

import { ColumnDef } from "@tanstack/react-table"
import { GenderType, LeadStatus } from "@prisma/client"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CellAction } from "./cell-action"





export type AppointMentCloumn = {
  id: string
  name: string
  address: string
  age: number
  gender: GenderType
  phone: string 
  date: string
  time: string
  email: string | null
  userId: string
  
}

export const columns: ColumnDef<AppointMentCloumn>[] = [
  
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: true,
    enableHiding: true,
  },
    
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "gender",
    header: "Sex",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  
  
  {
    accessorKey: "time",
    header: "Time",
  },
  
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    id: "actions",
    cell : ({row}) => <CellAction data={row.original}/>
  }
   

];