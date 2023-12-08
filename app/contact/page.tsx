import ContactSection from "@/components/ContactForm/Form2";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/navbar";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Navbar />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default page;
