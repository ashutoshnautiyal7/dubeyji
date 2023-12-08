"use client";

import * as React from "react";

import Hero from "@/components/Hero/Hero";
import Hero2 from "@/components/Hero2/Hero2";
import { Stats } from "@/components/Stats/Stats";
import Banner from "@/components/Banner/Banner";
import { Testimonial } from "@/components/Testimonials/Testimonial";

import AOS from "aos";
import "aos/dist/aos.css";
import Services from "@/components/Services/Services";
import Navbar from "@/components/NewNav/Navbar";
import Hero3 from "@/components/NewNav/Hero";
import Form from "@/components/ContactForm/Form2";
import Card1 from "@/components/ProfileCard/Card1";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import ReviewCard from "@/components/Carousel/ReviewCard";
import Booknow from "@/components/Booknow/Booknow";
import Footer from "@/components/Footer/Footer";
import Bot from "@/components/Bot/Bot";

export default function CardWithForm() {
  React.useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
    });
  }, []);
  return (
    <div className="overflow-hidden">
      <Navbar />
      <Hero3
        heading={"Dr. Dheeraj Dubay's Exceptional Joint Replacement Surgery! "}
        message={
          "Step into a Pain-Free Tomorrow: 15 Years of Mastery, 18,000 Smiles Created: Dr. Dheeraj Dubay's Journey in Joint Replacement Excellence "
        }
      />

      <Card1 />
      <Stats />

      <Hero2 />

      <Services />

      <WhyChoose />

      <Booknow />

      <Form />

      <Banner />

      <Testimonial />

      <Footer />

      <Bot />
    </div>
  );
}
