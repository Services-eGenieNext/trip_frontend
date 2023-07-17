import React from 'react'
import styles from "./hero.module.css"
import HeroBg from "/public/images/hero-section-bg.png"
import Ballon from "/public/images/baloon-transparent.png"
import Map from "/public/images/map-transparent.png"
import Image from 'next/image'

const Hero = () => {
    return (
        <div className="relative">
            <Image src={Ballon} alt='Baloon 1' className="absolute left-5 top-[20%] -z-10 select-none" />
            <Image src={Ballon} alt='Baloon 2' className="absolute right-[300px] top-[-40px] -z-10 select-none" />
            <Image src={Ballon} alt='Baloon 3' className="absolute right-[150px] top-[20%] -z-10 select-none" />
            <Image src={Map} alt='Map' className="absolute left-0 bottom-0 -z-10 select-none" />
            <div className="h-full w-full px-4">
                <Image src={HeroBg} alt='Trip-Banner' className="mx-auto select-none" />
            </div>
        </div>
    )
}

export default Hero