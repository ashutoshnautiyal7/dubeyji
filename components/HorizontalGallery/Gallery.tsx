"use client";
import React, { RefObject, useEffect, useRef } from "react";

import gsap from "gsap";

import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {};

const Gallery = (props: Props) => {
  const scroller = useRef() as RefObject<HTMLDivElement>;
  const skills = useRef() as RefObject<HTMLDivElement>;
  useEffect(() => {
    let skillSet = gsap.utils.toArray(".skill-set");

    let to = gsap.to(skillSet, {
      xPercent: () => -100 * (skillSet.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: scroller.current,
        markers: false,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        snap: 1 / (skillSet.length - 1),

        end: () => "+=" + window.innerWidth,
      },
    });

    return () => {
      to.kill();
    };
  }, []);

  return (
    <div className="overflow-hidden flex">
      <div className="overflow-hidden ">
        <div
          id="skills"
          ref={scroller}
          className=" flex overflow-x-hidden text-white w-[400vw] m-0 bg-[#E2FFF5] dark:bg-gray-900  relative h-screen"
        >
          <section
            ref={skills}
            className="skill-set px-12 w-screen h-full bg-transparent ns-horizontal-section__item flex items-center z-50"
          >
            <img
              src="/assets/images/one.jpeg"
              alt="1st image"
              className="max-w-[70vw] max-h-[60vh] m-auto object-contain"
            />
          </section>
          <section
            ref={skills}
            className="skill-set px-12 w-screen h-full bg-transparent ns-horizontal-section__item flex items-center z-50"
          >
            <img
              src="/assets/images/two.jpeg"
              alt="2ndimage"
              className="max-w-[70vw] max-h-[60vh] m-auto object-contain"
            />
          </section>
          <section
            ref={skills}
            className="skill-set px-12 w-screen h-full bg-transparent ns-horizontal-section__item flex items-center z-50"
          >
            <img
              src="/assets/images/three.jpeg"
              alt="2ndimage"
              className="max-w-[70vw] max-h-[60vh] m-auto object-contain"
            />
          </section>
          <section
            ref={skills}
            className="skill-set px-12 w-screen h-full bg-transparent ns-horizontal-section__item flex items-center z-50"
          >
            <img
              src="/assets/images/four.jpeg"
              alt="2ndimage"
              className="max-w-[70vw] max-h-[60vh] m-auto object-contain"
            />
          </section>
          <section
            ref={skills}
            className="skill-set px-12 w-screen h-full bg-transparent ns-horizontal-section__item flex items-center z-50"
          >
            <img
              src="/assets/images/five.jpeg"
              alt="2ndimage"
              className="max-w-[70vw] max-h-[60vh] m-auto object-contain"
            />
          </section>
          <section
            ref={skills}
            className="skill-set px-12 w-screen h-full bg-transparent ns-horizontal-section__item flex items-center z-50"
          >
            <img
              src="/assets/images/six.jpeg"
              alt="2ndimage"
              className="max-w-[70vw] max-h-[60vh] m-auto object-contain"
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
