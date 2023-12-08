import React from "react";
import { useRouter } from "next/navigation";
const Hero = ({ heading, message }: any) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/booking");
  };
  return (
    <div className="flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img">
      {/* Overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/80 z-[2]" />
      <div className="p-5 text-white z-[2] md:mt-[-10rem] ">
        <h2 className="text-5xl font-bold w-2/3">{heading}</h2>
        <p className="py-5 text-xl">{message}</p>
        <button
          onClick={handleClick}
          className="px-8 md:px-16 bg-primary font-bold text-xl py-2 border"
        >
          Book An Appointment
        </button>
      </div>
    </div>
  );
};

export default Hero;
