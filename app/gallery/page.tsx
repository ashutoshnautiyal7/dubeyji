import Footer from "@/components/Footer/Footer";
import Gallery1 from "@/components/Gallery/Gallery1";
import Navbar from "@/components/Navbar/navbar";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Navbar />
      <Gallery1 />
      <Footer />
    </div>
  );
};

export default page;
