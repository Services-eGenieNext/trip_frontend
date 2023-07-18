import Logo from "/public/logo_white.png";
import DottedMap from "/public/images/dotted_map.png";
import Image from "next/image";
import CSS from "./footer.module.css";
import {FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram} from 'react-icons/fa'

const SocialIcons = [
    {icon: FaFacebookF, name: "Facebook"},
    {icon: FaLinkedinIn, name: "Linkedin"},
    {icon: FaTwitter, name: "Twitter"},
    {icon: FaInstagram, name: "Instagram"},
]

export default function Footer() {
  return (
    <div className={`${CSS.footer} -z-20`}>
      <Image src={DottedMap} className="absolute top-0 right-0 -z-10" alt="" />
      <div className="mt-16 pt-12 text-white flex flex-col items-center justify-between h-full w-full">
        <div className="col-span-4">
          <Image src={Logo} alt="logo" />
        </div>
        <div className={`h-[70px] px-6 flex items-center ${CSS["border_gradient"]}`}>
            <div className="md:w-[180px] sm:w-[130px] sm:px-0 px-3 flex items-center justify-center text-[20px] font-medium border-r-2 border-[#444658]">
            Results
            </div>
            <div className="md:w-[180px] sm:w-[130px] sm:px-0 px-3 flex items-center justify-center text-[20px] font-medium border-r-2 border-[#444658]">
            Itinerary
            </div>
            <div className="md:w-[180px] sm:w-[130px] sm:px-0 px-3 flex items-center justify-center text-[20px] font-medium border-r-2 border-[#444658]">
            Survey
            </div>
            <div className="md:w-[180px] sm:w-[130px] sm:px-0 px-3 flex items-center justify-center text-[20px] font-medium">
            Reviews
            </div>
        </div>
        <div className="flex items-center gap-x-6">
            {SocialIcons && SocialIcons.map((social,index)=>{
            return <div key="index" className={`${CSS["social_icon"]} rounded-full flex justify-center items-center text-black text-[20px]`}>
                {<social.icon/>}
            </div>
            })}
        </div>
        <div className="h-[74px] sm:w-[90%] sm:px-0 px-2 border-t-2 border-[#3C3F52] flex justify-center items-center">
            <p className={`sm:text-[18px] text-[14px] uppercase tracking-wider ${CSS["copyright"]}`}>Copyright © 2022 IPLAN. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
