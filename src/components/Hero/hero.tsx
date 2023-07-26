import React, { useState } from "react";
import HeroBg from "/public/images/hero-section-bg.png";
import Ballon from "/public/images/baloon-transparent.png";
import Map from "/public/images/map-transparent.png";
import Image from "next/image";
import HeroFilterSection from "./heroFilterSection";
import styles from './hero.module.css'

const Hero = () => {
  return (
    <div className="relative">
      <Image
        src={Ballon}
        alt="Baloon 1"
        className="absolute left-5 top-[20%] -z-10 select-none sm:flex hidden"
      />
      <Image
        src={Ballon}
        alt="Baloon 2"
        className="absolute right-[300px] top-[-40px] -z-10 select-none sm:flex hidden"
      />
      <Image
        src={Ballon}
        alt="Baloon 3"
        className="absolute right-[150px] top-[20%] -z-10 select-none sm:flex hidden"
      />
      <Image
        src={Map}
        alt="Map"
        className="absolute left-0 bottom-0 -z-10 select-none sm:flex hidden"
      />
      <div className="h-full w-full px-4 relative">
        <div className="relative m-auto width">
          <Image
            src={HeroBg}
            alt="Trip-Banner"
            className="mx-auto select-none w-full"
          />
          <div className="absolute bottom-0 left-0 top-0 right-0 px-8 flex flex-col justify-center items-center xl:my-[8rem] sm-width">
            <h1 className="uppercase sm:leading-10 text-white font-thin text-xl lg:text-3xl lg:my-5 sm:my-3 my-0 gilroy">
              Plan Your Dream
            </h1>
            <h2 className="leading-10 text-white font-bold text-xl sm:text-2xl lg:text-6xl lg:my-5 sm:my-3 my-0 text-center w-full gilroy">
              Trip In Seconds With WePlan
            </h2>
            <p className="lg:my-5 text-white sm:text-lg text-sm max-w-[700px] text-center">
              We take away all the hassle associated with trip planning. Be
              excited about your vacation, we&lsquo;ve got the details covered!
            </p>
            <div className="lg:block hidden">
              <HeroFilterSection />
            </div>
          </div>
        </div>
          <div className={`block lg:hidden ${styles["shadow_box"]}`}>
              <HeroFilterSection />
            </div>
      </div>

      {/* <span className="md:hidden fixed right-0 flex justify-centera items-center text-white w-[40px] h-[40px] bg-[#009DE2] rounded-l-lg z-10"
            onClick={() => setOpenAdvanceSearch(!openAdvanceSearch)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
            </span> */}
    </div>
  );
};

export default Hero;
