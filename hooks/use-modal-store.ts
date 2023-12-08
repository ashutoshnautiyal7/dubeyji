
import {create} from "zustand"
import { Lead } from "@prisma/client";
import { LeadCloumn } from "@/app/admin/patients/components/column";
import { RowModel } from "@tanstack/react-table";


export type ModalType = "createPatient" | "sendMessage" | "sendBulkMessage" | "createDiscussion" | "editDiscussion" | "sendAppointmentReminder"

interface ModalData{
    lead?: Lead
    recipent?: LeadCloumn
    template?: any
    appointment?: any
}

interface ModalStrore{
    type: ModalType | null
    isOpen:  boolean
    data: ModalData
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStrore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({isOpen: true, type, data}),
    onClose: () => set({type: null, isOpen: false})
}))