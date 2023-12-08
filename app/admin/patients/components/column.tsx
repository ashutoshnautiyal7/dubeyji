"use client"

import { ColumnDef, FilterFn } from "@tanstack/react-table"
import { GenderType, LeadStatus } from "@prisma/client"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CellAction } from "./cell-action"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"




export type LeadCloumn = {
  id: string
  name: string
  address: string | null
  age: number | null
  gender: GenderType
  doad: string | null
  phone: string | null
  dood: string | null
  dx : string | null
  surgery: string | null
  remark: string | null
  status: LeadStatus
  ipdReg: number | null
  bill: number | null
  implant : string | null
}

const selectFilterFn : FilterFn<any> = (row, columnId, value, addMeta) => {
  if (value === undefined || value.length === 0) {
    return false;
  } else {
    const { someProp, otherProp } = mapOrConvertBackLabel(value);
    return someProp.includes(row.original.status?.someProp) && otherProp .includes(row.original.status?.otherProp );
  }
};
export const columns: ColumnDef<LeadCloumn>[] = [
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
    enableSorting: false,
    enableHiding: false,
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
    accessorKey: "doad",
    header: "D.O.AD",
  },
  {
    accessorKey: "dood",
    header: "D.O.OP",
  },
  {
    accessorKey: "dx",
    header: "Description",
  },
  {
    accessorKey: "surgery",
    header: "Surgery",
  },
  {
    accessorKey: "side",
    header: "Side",
  },
  {
    accessorKey: "bill",
    header: "Bill",
    
  },
  {
    accessorKey: "remark",
    header: "Remark",
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
    accessorKey: "status",
    // accessorFn: x => x.status,
    header: ({ table }) => (
      // <input
      //   type="text"
      //   value={table.getColumn("status")?.getFilterValue()}
      //   onChange={(event) => table.getColumn("status")?.setFilterValue(event.target.value)}
      //   className="max-w-sm"
      //   />
         <select
        title="filter"
        //@ts-ignore
        value={table.getColumn("status")?.getFilterValue()}
        onChange={(event) => table.getColumn("status")?.setFilterValue(event.target.value)}
      >
        <option value="">All</option>
        {Object.values(LeadStatus).map((option: any, i, _) => (
           <option key={i} value={option}>
              {option}
            </option>
          ))}
      </select>
    ),
    enableColumnFilter: true,

    // filterFn: selectFilterFn,
    // meta: {
    //       filterComponent: CustomFilter
    //     }
    
  },
  {
    accessorKey: "ipdReg",
    header: "IPD Reg",
    
  },
  
  {
    accessorKey: "implant",
    header: "implant",
    
  },
  {
    id: "actions",
    cell : ({row}) => <CellAction data={row.original}/>
  }
   

];

function mapOrConvertBackLabel(value: any): { someProp: any; otherProp: any } {
  throw new Error("Function not implemented.")
}
