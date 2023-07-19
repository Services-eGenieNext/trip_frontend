import React, { CSSProperties } from 'react'
import PageBannerImg from "/public/images/page-banner.png"

interface IPageBanner {
    title: string;
}

const PageBanner = ({title}: IPageBanner) => {

    const style: CSSProperties = {
        background: `linear-gradient(360deg, #00000069, transparent), url(${PageBannerImg.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    }

    return (
        <div className="h-[405px] width w-full rounded-xl flex justify-center items-center" style={style}>
            <span className="font-extrabold text-7xl Poppins text-white">{title}</span>
        </div>
    )
}

export default PageBanner