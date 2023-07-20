import React, { CSSProperties } from 'react'
import PageBannerImg from "/public/images/page-banner.jpg"

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
        <div className="width px-4">
            <div className="h-[405px] w-full rounded-xl flex justify-center items-center" style={style}>
                <span className="font-extrabold text-5xl md:text-7xl Poppins text-white text-center">{title}</span>
            </div>
        </div>
    )
}

export default PageBanner