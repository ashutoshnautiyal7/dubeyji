"use client";

import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import "../../components/Calendar/Calendar.css";
import { format, formatISO, isSameDay } from "date-fns";

type Props = {
  closedDays: string[];
};

const ClosingDate = ({ closedDays }: Props) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const handleDateClick = (date: Date) => {
    // Check if the date is already selected
    const isDateSelected = selectedDates.some(
      (d) => d.toISOString() === date.toISOString()
    );

    if (!isDateSelected) {
      // Update the selectedDates array with the new date
      setSelectedDates([...selectedDates, date]);
    } else {
      // Deselect the date if it's already selected
      const updatedDates = selectedDates.filter(
        (d) => d.toISOString() !== date.toISOString()
      );
      setSelectedDates(updatedDates);
    }
  };

  const handleSubmit = async () => {
    try {
      // Assuming your API endpoint is /api/closedDays and using POST method
      const response = await fetch("/api/days/closed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedDates }),
      });

      if (response.ok) {
        console.log("Dates submitted successfully!");
        // Optionally, you can reset the selectedDates array here
        setSelectedDates([]);
      } else {
        console.error("Failed to submit dates");
      }
    } catch (error) {
      console.error("Error submitting dates:", error);
    }
    location.reload();
  };

  return (
    <div className="p-4 mx-auto dark:text-gray-800">
      <div className="text-lg md:text-3xl text-primary font-semibold mb-2 dark:text-gray-200">
        Closing Dates
      </div>
      <ReactCalendar
        minDate={new Date()}
        className="REACT-CALENDAR p-2 mx-auto"
        view="month"
        onClickDay={handleDateClick}
        tileDisabled={({ date }) => {
          const formattedDate = format(date, "yyyy-MM-dd"); // Format the date
          return closedDays.some((closedDate) =>
            isSameDay(new Date(closedDate), new Date(formattedDate))
          );
        }}
      />

      {/* Display selected dates */}
      <div className="mt-4 ">
        <h2 className="text-lg md:text-3xl font-semibold mb-2 dark:text-gray-200">
          Selected Dates:
        </h2>
        <ul className="list-disc pl-4">
          {selectedDates.map((date) => (
            <li
              key={date.toISOString()}
              className="text-gray-800 dark:text-gray-200"
            >
              {date.toISOString()}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white transition"
      >
        Submit
      </button>
    </div>
  );
};

export default ClosingDate;
