"use client";

import React, { useState } from "react";

const EditableTable = ({ days }: any) => {
  const [editableDays, setEditableDays] = useState([...days]);

  const handleFieldChange = (index: any, field: any, value: any) => {
    const updatedDays = [...editableDays];
    updatedDays[index][field] = value;
    setEditableDays(updatedDays);
  };

  const handleUpdate = async () => {
    try {
      // 1. Update Backend Data
      const response = await fetch("/api/days/updatemultiple", {
        method: "PUT", // Use "PATCH" if your API supports partial updates
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editableDays),
      });

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      // 2. Update Frontend State
      // Assuming the response from the backend contains the updated data
      const updatedData = await response.json();
      setEditableDays([...updatedData]);

      console.log("Data updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 rounded-md  bg-primary dark:bg-gray-800">
      <table className="min-w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-100 dark:bg-gray-600">
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-500">Name</th>
            <th className="py-2 px-4 border-b dark:border-gray-500">
              Day of Week
            </th>
            <th className="py-2 px-4 border-b dark:border-gray-500">
              Open Time
            </th>
            <th className="py-2 px-4 border-b dark:border-gray-500">
              Close Time
            </th>
          </tr>
        </thead>
        <tbody>
          {editableDays.map((day, index) => (
            <tr
              key={day.id}
              className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800 " : ""}
            >
              <td className="py-2 px-4 border-b dark:border-gray-500">
                <input
                  className="w-full border rounded py-1 px-2 dark:bg-gray-900 dark:text-white"
                  type="text"
                  value={day.name}
                  disabled
                />
              </td>
              <td className="py-2 px-4 border-b dark:border-gray-500">
                <input
                  className="w-full border rounded py-1 px-2 bg-gray-200 dark:bg-gray-800 dark:text-white"
                  type="number"
                  value={day.dayOfWeek}
                  disabled
                />
              </td>
              <td className="py-2 px-4 border-b dark:border-gray-500">
                <input
                  className="w-full border rounded py-1 px-2 dark:bg-gray-900 dark:text-white"
                  type="text"
                  value={day.openTime}
                  onChange={(e) =>
                    handleFieldChange(index, "openTime", e.target.value)
                  }
                />
              </td>
              <td className="py-2 px-4 border-b dark:border-gray-500">
                <input
                  className="w-full border rounded py-1 px-2 dark:bg-gray-900 dark:text-white"
                  type="text"
                  value={day.closeTime}
                  onChange={(e) =>
                    handleFieldChange(index, "closeTime", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className=" border-2 border-white mt-4 bg-primary  text-white font-bold py-2 px-4 rounded "
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default EditableTable;
