import Calendar from "@/components/Calendar/Calendar";
import { db } from "@/lib/db";
import React from "react";
import { format, formatISO } from "date-fns";
import { Day } from "@prisma/client";
import { currentProfile } from "@/lib/current-profile";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ClosingDate from "@/components/ClosingDate/ClosingDate";
import EditableTable from "@/components/EditableTable/EditableTable";

interface HomeProps {
  days: Day[];
  closedDays: string[];
}

const page = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!profile) {
  }
  const days: Day[] = await db.day.findMany();

  const closedDays: string[] = (await db.closedDay.findMany()).map((d) =>
    formatISO(d.date)
  );
  return (
    <div>
      <div className="lg:flex lg:my-32 ">
        <EditableTable days={days} />
        <ClosingDate closedDays={closedDays} />
      </div>
    </div>
  );
};

export default page;
