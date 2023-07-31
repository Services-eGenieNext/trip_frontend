import React, { useEffect, useRef, useState } from 'react'
import {
    FaFacebookF,
    FaLinkedinIn,
    FaTwitter,
    FaInstagram,
} from "react-icons/fa";
import styles from "./Header.module.css"
import { ImNotification } from 'react-icons/im';
import { ITripPlanningHeader } from '@/interfaces/TripPlan';
import ComponentTitle from '@/components/UIComponents/ComponentTitle';
  
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

const TripPlanningHeader = ({ variation = "space-arround" }: ITripPlanningHeader) => {

    const ref = useRef<HTMLInputElement>(null);
    const [read, setRead] = useState(false);

    const ShareWithSec = () => {
        return <div className="flex items-center sm:mt-0 mt-3">
            <h1 className="font-medium text-[21px] leading-[27px]">Share with:</h1>
            <div className="flex items-center gap-x-3 ml-3">
                {SocialIcons &&
                SocialIcons.map((social, index) => {
                    return (
                    <div
                        key={index}
                        className={`${styles["social_icon"]} rounded-full flex justify-center items-center text-white text-[12px]`}
                    >
                        {<social.icon />}
                    </div>
                    );
                })}
            </div>
        </div>
    }

    useEffect(() => {
        const handleClickOutside = (event:any) => {
        if (!ref?.current?.contains(event.target)) {
            setRead(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
    }, [ref]);

    return (
        <div className={`flex md:flex-row flex-col sm:justify-between items-center mb-10 ${variation == "space-arround" && 'md:items-end'} w-full`}>
            {/* <h1 className="md:text-4xl text-2xl font-bold">Trip Planning</h1> */}
            <ComponentTitle title="Trip Planning" />

            {
                variation === "space-arround" && (
                    <div>
                        <ShareWithSec />
                    </div>
                )
            }
            <div className="flex flex-col sm:items-end items-center">
                {
                    variation === "space-between" && (
                        <ShareWithSec />
                    )
                }
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
                    <div className="absolute top-[30px] sm:right-0 -right-[50px] bg-white rounded-xl p-7 shadow-2xl w-[300px] z-20" ref={ref}>
                        {Cost &&
                        Cost.map((category, index) => {
                            return (
                            <div
                                key={index}
                                className="flex items-center justify-between w-full py-3"
                            >
                                <div className="w-[5px] h-[5px] rounded-full bg-[var(--blue)]"></div>
                                <h1 className="text-black">{category.name}</h1>
                                <div className="w-[76px] border-dashed border-t border-[#BFCCD1]"></div>
                                <h1 className="text-[#BFCCD1] font-semibold">${category.cost}</h1>
                            </div>
                            );
                        })}
                        <div className="w-full h-[44px] border-t border-[#E3E6EC] rounded-xl mt-3 py-3 text-right">
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
    )
}

export default TripPlanningHeader