import React, { useState, useRef, useEffect } from "react";
import CSS from "./tripPlanning.module.css";
import DemiData from "@/api/DemiData";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { ImNotification } from "react-icons/im";
import PricingCard from "./pricingCard";

const SocialIcons = [
  { icon: FaFacebookF, name: "Facebook" },
  { icon: FaLinkedinIn, name: "Linkedin" },
  { icon: FaTwitter, name: "Twitter" },
  { icon: FaInstagram, name: "Instagram" },
];

const Cost = [
  { name: "Flight Cost", cost: 1000 },
  { name: "Stay Cost", cost: 1000 },
  { name: "Food Cost", cost: 1000 },
];

export default function TripPlanningCard() {
   const ref = useRef<HTMLInputElement>(null);
  const [read, setRead] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (!ref?.current?.contains(event.target)) {
        setRead(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return (
    <div className="w-full flex justify-center mt-20 relative">
      <div className="flex flex-col sm-width gilroy">
        <div className="flex md:flex-row flex-col sm:justify-between items-center w-full">
          <h1 className="md:text-4xl text-2xl font-bold">Trip Planning</h1>
          <div className="flex flex-col sm:items-end items-center">
            <div className="flex items-center sm:mt-0 mt-3">
              <h1 className="font-medium text-[21px] pt-2">Share with:</h1>
              <div className="flex items-center gap-x-3 ml-3">
                {SocialIcons &&
                  SocialIcons.map((social, index) => {
                    return (
                      <div
                        key={index}
                        className={`${CSS["social_icon"]} rounded-full flex justify-center items-center text-black text-white text-[12px]`}
                      >
                        {<social.icon />}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="flex items-center gap-x-3 mt-2">
              <p className="font-medium text-[21px] pt-1">
                Total Price - $3000
              </p>
              <div
                className="relative text-[#009DE2] font-bold text-[18px] cursor-pointer"
                onClick={() => {
                  setRead(!read);
                }}
              >
                <ImNotification />
                {read && read == true ? (
                  <div className="absolute top-[30px] sm:right-0 -right-[50px] bg-white rounded-xl pt-10 pb-7 shadow-2xl w-[300px] flex flex-col items-center gap-y-5 z-20" ref={ref}>
                    {Cost &&
                      Cost.map((category, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between gap-x-3"
                          >
                            <div className="w-[5px] h-[5px] rounded-full bg-[#009DE2]"></div>
                            <h1 className="text-black">{category.name}</h1>
                            <div className="w-[76px] border-dashed border border-[#BFCCD1]"></div>
                            <h1 className="text-[#BFCCD1]">${category.cost}</h1>
                          </div>
                        );
                      })}
                    <div className="w-[90%] h-[44px] flex justify-end items-center border-t-4 border-[#E3E6EC] rounded-xl px-2">
                      <h1 className="text-[#009DE2]">$3000</h1>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-12">
        {DemiData.PricingPlans &&
          DemiData.PricingPlans.map((items, index) => {
            return (
                <PricingCard key={index} data={items} />
            );
          })}
      </div>
      </div>
    </div>
  );
}
