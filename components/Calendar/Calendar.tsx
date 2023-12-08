"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import ReactCalendar from "react-calendar";

import "./Calendar.css";

import { isSameDay, format, formatISO, isBefore, parse } from "date-fns";
import {
  CLOSING_TIME,
  INTERVAL,
  OPENING_HOURS_INTERVAL,
  OPENING_TIME,
  now,
} from "./Constants/config";
import { useRouter } from "next/navigation";
import { getOpeningTimes, roundToNearestMinutes } from "@/utils/helper";
import { Day } from "@prisma/client";
import { useModal } from "@/hooks/use-modal-store";
import { currentUser } from "@clerk/nextjs";
import qs from "query-string";
import { db } from "@/lib/db";

type DateTime = {
  justDate: Date | null;
  dateTime: Date | null;
};

interface indexProps {
  date: DateTime;
  setDate: Dispatch<SetStateAction<DateTime>>;
}

interface CalendarProps {
  days: Day[];
  closedDays: string[];
}

const Calendar = ({ days, closedDays }: CalendarProps) => {
  const router = useRouter();

  const { onOpen } = useModal();

  // console.log("the days sent to props in the calendar are ", days);
  // Determine if today is closed
  const today = days.find((d) => d.dayOfWeek === now.getDay());
  const rounded = roundToNearestMinutes(now, OPENING_HOURS_INTERVAL);
  const closing = parse(today!.closeTime, "kk:mm", now);
  const tooLate = !isBefore(rounded, closing);
  if (tooLate) closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)));

  const [date, setDate] = useState<DateTime>({
    justDate: null,
    dateTime: null,
  });

  useEffect(() => {
    if (date.dateTime) {
      const formattedDate = format(date.dateTime, "dd-MM-yyyy");
      const formattedTime = format(date.dateTime, "hh:mm aaa");
      const booking = qs.stringifyUrl({
        url: "/booking/booking-form",
        query: {
          date: formattedDate,
          time: formattedTime,
        },
      });
      router.push(booking);
    }
  }, [date.dateTime, router]);

  // console.log("the just date is ", date.justDate);

  const times = date.justDate && getOpeningTimes(date.justDate, days);

  console.log("the closed days in the calender are ", closedDays);

  return (
    <div className="flex  flex-col justify-center items-center dark:text-gray-800">
      {date.justDate ? (
        <div className="flex flex-wrap gap-4">
          {times?.map((time, i) => (
            <div key={`time-${i}`} className="rounded-sm bg-gray-100 p-2 ">
              <button
                type="button"
                onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
              >
                {format(time, "hh: mm aaa")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ReactCalendar
          minDate={new Date()}
          className="REACT-CALENDAR p-2 mx-auto "
          view="month"
          tileDisabled={({ date }) => {
            const formattedDate = format(date, "yyyy-MM-dd"); // Format the date
            return closedDays.some((closedDate) =>
              isSameDay(new Date(closedDate), new Date(formattedDate))
            );
          }}
          onClickDay={(date) =>
            setDate((prev) => ({
              ...prev,
              justDate: date,
            }))
          }
        />
      )}
    </div>
  );
};

export default Calendar;
