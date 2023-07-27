import React, { CSSProperties } from 'react'
import PageBannerImg from "/public/images/page-banner.jpg"
import Ballon from "/public/images/baloon-transparent.png";
import Image from "next/image";
import Map from "/public/images/map-transparent.png";

interface IPageBanner {
    title: string;
}

const PageBanner = ({title}: IPageBanner) => {

    const style: CSSProperties = {
        background: `linear-gradient(360deg, #00000069, transparent), url(${PageBannerImg.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    }

    return (
        <div className="width px-4 relative">
            <Image
        src={Ballon}
        alt="Baloon 1"
        className="absolute left-[-30px] top-[15%] -z-10 select-none md:block hidden"
      />
      <Image
        src={Ballon}
        alt="Baloon 4"
        className="absolute right-[-30px] top-[15%] -z-10 select-none md:block hidden"
      />
      <Image
        src={Map}
        alt="Map"
        className="absolute left-[-90px] bottom-[-25%] -z-10 select-none sm:flex hidden w-[13%] md:block hidden"
      />
            <div className="h-[405px] w-full rounded-xl flex justify-center items-center" style={style}>
                <span className="font-extrabold text-5xl md:text-7xl Poppins text-white text-center">{title}</span>
            </div>
        </div>
    )
}

export default PageBanner