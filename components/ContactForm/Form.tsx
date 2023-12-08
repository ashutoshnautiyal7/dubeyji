import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import Link from "next/link";
type Props = {};

const Form = (props: Props) => {
  return (
    <div
      className="bg-[#b0e9d26e] h-full py-8  md:py-32"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/assets/images/medicalbg2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(115px)",
      }}
    >
      <div className="flex flex-col text-center px-5">
        <h1 className="text-2xl md:text-5xl font-semibold text-gray-100">
          Contact Us
        </h1>
        <span className="my-6 px-[0px] md:px-[40px] lg:px-[100px] xl:px-[200px] md:w-[70%] mx-auto md:text-xl text-gray-50">
          Ready to take the first step towards a pain-free life? Reach out to us
          today, and lets start your journey to renewed mobility and well-being
        </span>
      </div>
      <div className="flex flex-wrap md:flex-nowrap justify-center px-5 mt-5 ">
        <div
          data-aos="flip-down"
          className="bg-[#E2FFF5] text-gray-700 p-6 rounded-xl w-[400px] md:mx-4 mb-6 md:mb-0 h-fit"
        >
          <div className="">
            <h1 className="text-3xl font-bold">Contact Information</h1>
            <p className="mt-2 mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
              inventore.
            </p>
            <div className="flex items-center my-3">
              <EmailIcon />
              <span className="mx-2">hello@gmail.com</span>
            </div>
            <div className="flex items-center my-3">
              <PlaceIcon />
              <span className="mx-2">
                Riverside Building, Country Hall, London SE1 7PB, United Kingdom
              </span>
            </div>
            <div className="flex items-center my-3">
              <LocalPhoneIcon />
              <span className="mx-2">+01 5421234560</span>
            </div>
          </div>
          <div className="flex mt-8 mb-6">
            <div className="border border-white p-2 rounded-lg w-fit hover:bg-green-500 mx-2 cursor-pointer">
              <YouTubeIcon />
            </div>
            <div className="border border-white p-2 rounded-lg w-fit hover:bg-green-500 mx-2 cursor-pointer">
              <TwitterIcon />
            </div>
            <div className="border border-white p-2 rounded-lg w-fit hover:bg-green-500 mx-2 cursor-pointer">
              <InstagramIcon />
            </div>
            <div className="border border-white p-2 rounded-lg w-fit hover:bg-green-500 mx-2 cursor-pointer">
              <FacebookIcon />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl w-[500px] md:mx-4 my-6 md:my-0 dark:text-gray-800">
          <div className="">
            <h1 className="font-bold mb-3 ">Full name</h1>
            <input
              type="text"
              className="w-full rounded-xl border border-black p-2 h-[50px]"
              placeholder="Enter your full name"
            />
          </div>
          <div className="">
            <h1 className="font-bold my-3">Email</h1>
            <input
              type="email"
              className="w-full rounded-xl border border-black p-2 h-[50px]"
              placeholder="Enter your email"
            />
          </div>
          <div className="">
            <h1 className="font-bold my-3">Message</h1>
            <textarea
              className="w-full rounded-xl border border-black p-2  h-[90px]"
              placeholder="Write your message now ! "
            />
          </div>
          <div className="">
            <button className="w-full font-bold text-xl bg-primary rounded-xl p-3 text-white mt-5">
              Contact Now
            </button>
            <p className="text-center text-2xl font-semibold mt-2">or</p>
            <button className="w-full font-bold text-xl border-2 border-primary text-primary rounded-xl p-3 mt-5">
              <Link href={"/booking"}>Book an Appointment</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
