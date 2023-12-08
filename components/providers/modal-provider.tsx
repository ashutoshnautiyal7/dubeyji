"use client"

import { useEffect, useState } from "react"
import { CreatePatientModal } from "../modals/create-patient-modal";
import { SendMessageModal } from "../modals/send-message-modal";
import { SendBulkMessageModal } from "../modals/send-bulk-messages";
import { CreateDiscuusionModal } from "../modals/create-discussion";
import { EditDiscussionModal } from "../modals/edit-discussion";
import { SendAppointmentReminder } from "../modals/appointment-reminder-modal";

export const ModalProvider = () => {
    const [isMounted,  setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted){
        return null;
    }
    return(
        <>
            <CreatePatientModal/>
            <SendMessageModal/>
            <SendBulkMessageModal/>
            <CreateDiscuusionModal/>
            <EditDiscussionModal/>
            <SendAppointmentReminder/>
            
        </>
    )
}