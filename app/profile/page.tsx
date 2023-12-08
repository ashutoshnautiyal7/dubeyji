import ProfileCard from "@/components/UserProfile/ProfileCard";
import { db } from "@/lib/db";
import React from "react";

import { currentProfile } from "@/lib/current-profile";
import Navbar from "@/components/Navbar/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = async () => {
  const user = await db.profile.findMany();
  const AuthProfile = await currentProfile();

  if (!AuthProfile) {
    console.error("Profile is undefined");
    return null; // or handle the case where the profile is not available
  }

  const { userId, name, imageUrl, email } = AuthProfile;

  const appointments = await db.appointment.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const phone = appointments[0]?.phone;

  console.log("My appointments  ", appointments);

  return (
    <>
      <Navbar />

      {appointments.length > 0 ? (
        <>
          <ProfileCard
            name={name}
            imageUrl={imageUrl}
            email={email}
            appointments={appointments}
            phone={phone}
          />

          <div className="container mx-auto px-4 mt-10 mb-10">
            <h2 className="text-3xl font-bold mb-2">Discussions</h2>
            <div className="flex flex-col gap-6">
              {appointments.map((appointment: any) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  {appointment.discussionTitle ? (
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          {appointment.discussionTitle}
                        </h3>
                        <p className="text-gray-600">
                          {appointment.discussionDescription}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">
                          {appointment.date} at {appointment.time}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <h3 className="text-xl font-bold mb-2 text-center">
                        No discussion for appointment scheduled for{" "}
                        {appointment.date} at {appointment.time}
                      </h3>
                      <div>
                        <p className="text-gray-600">
                          {appointment.date} at {appointment.time}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-lg  md:text-3xl font-semibold text-center m-12">
          <div className="my-8">
            Book an Appointment to create Patient Profile !
          </div>
          <Link
            href={"/booking"}
            className="bg-gradient-to-r from-primary to-cyan-200 py-4 px-32 rounded-full"
          >
            Book Now
          </Link>
        </div>
      )}
    </>
  );
};

export default page;
