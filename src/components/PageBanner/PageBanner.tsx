import React, { CSSProperties, useEffect, useState } from 'react'
import PageBannerImg from "/public/images/page-banner.jpg"
import Ballon from "/public/images/baloon-transparent.png";
import Image from "next/image";
import Map from "/public/images/map-transparent.png";
import { _getlocationImages } from '@/api-calls/locations-call';
import { getLocationImagesById } from '@/api-calls/location-details-call';

interface IPageBanner {
    title: string;
    automateLocation?: any
}

const PageBanner = ({title, automateLocation}: IPageBanner) => {
    
    const [bgImage , setBgImage] = useState<string | null>(null)

    useEffect(() => {
        const _def = async () => {
            if(automateLocation?.location_id)
            {
                let res: any = await getLocationImagesById(automateLocation.location_id)
                if(res.data.data.length > 0)
                {
                    let _imagesObject = res.data.data[0].images
                    let selectedImage = _imagesObject.original ? _imagesObject.original.url : _imagesObject.large.url
                    setBgImage(selectedImage)
                }
            }
            if(automateLocation?.place_id)
            {
                let res = await _getlocationImages(automateLocation.photos[0].photo_reference)
                setBgImage(res)
            }
        }
        _def()
    }, [automateLocation])

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
        className="absolute left-[-90px] bottom-[-25%] -z-10 select-none sm:flex w-[13%] md:block hidden"
      />
            <div className="h-[405px] w-full rounded-xl flex justify-center items-center relative overflow-hidden">
                <Image src={bgImage ? bgImage : PageBannerImg.src} fill={true} alt='banner' style={{objectFit: "cover"}} className="z-0" />
                <div className="absolute inset-0" style={{background: 'linear-gradient(360deg, #00000069, transparent)'}}></div>
                <span className="font-extrabold text-5xl md:text-7xl Poppins text-white text-center z-[1]">{title}</span>
            </div>
        </div>
    )
}

export default PageBanner