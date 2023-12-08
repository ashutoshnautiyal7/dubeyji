import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const WhyChoose = (props: Props) => {
  return (
    <div className="w-[80%]  mx-auto my-16 md:my-32">
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-56">
        <div data-aos="slide-right" className=" mx-auto md:w-[70%]">
          <Image
            width={900}
            height={900}
            src="/assets/images/whycoose2.jpg"
            alt="#"
            className="rounded-xl"
          />
        </div>

        <div data-aos="slide-left" className="md:w-1/2  ">
          <h1 className="text-2xl md:text-5xl font-semibold text-primary my-8">
            Why Choose Us?
          </h1>
          <ul className="list-disc list-inside mt-4 text-xl md:text-2xl">
            <li className="flex items-center my-2">
              <CheckCircleIcon className="mr-2 " color="primary" />
              Safety First Quality Must
            </li>
            <li className="flex items-center my-2">
              <CheckCircleIcon className="mr-2" color="primary" />
              Patient-Centric Approach
            </li>
            <li className="flex items-center my-2">
              <CheckCircleIcon className="mr-2" color="primary" />
              Focused Leadership
            </li>
            <li className="flex items-center my-2">
              <CheckCircleIcon className="mr-2" color="primary" />
              Cutting-Edge Technology
            </li>
            <li className="flex items-center my-2">
              <CheckCircleIcon className="mr-2" color="primary" />
              Transparent Pricing
            </li>
            <li className="flex items-center my-2">
              <CheckCircleIcon className="mr-2" color="primary" />
              Coordinated Care
            </li>
          </ul>
        </div>
      </div>
      <div className="my-[80px]">
        <h1 className="text-4xl md:text-5xl font-semibold">
          <span className=" text-primary">|</span> Wellness{" "}
          <span className=" text-primary">|</span> Compassion{" "}
          <span className=" text-primary">|</span> Quality{" "}
          <span className=" text-primary">|</span>
        </h1>
        <p className="my-4 text-lg md:text-2xl">
          We provide you the best quality at the most affordable price . Book an
          appointment now and visit any of our 5 centers.
        </p>
        <button className="bg-primary px-5 md:px-16 md:py-3 py-2  text-white mt-4 text-xl md:text-2xl  font-bold">
          <Link href={"/booking"}>Book An Appointment</Link>
        </button>
      </div>
    </div>
  );
};

export default WhyChoose;
