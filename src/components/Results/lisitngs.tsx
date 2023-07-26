import React from "react";
import Image from "next/image";
import PlaceImg from "/public/images/placeImg_01.png";
import { FilledStar } from '../icons/Stars'

export default function Lisitngs() {
  const list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  return (
    <div className="px-16">
      <p className="text-[18px] text-[#3F3F3F]">
        Show listing of 100 Places...
      </p>
      <div className="flex flex-wrap itemns-center my-8 gap-y-14 gap-x-10">
        {list.length && list.map((list:any,index:number)=>{
          return (
        <div key={index} className="w-[260px] h-[370px] overflow-hidden rounded-lg flex flex-col justify-between">
          <div className="h-[235px] w-full relative">
            <Image src={PlaceImg} alt="PlaceImg" className="h-full w-full" />
            <div className="absolute top-2 right-2 flex items-center gap-x-2 bg-white py-1 px-4 rounded-full">
                <FilledStar/>
                <p className="text-[#009DE2] font-semibold">4.5</p>
            </div>
          </div>
          <p className="text-[22px] font-semibold text-[#2D2D2D]">France</p>
          <p className="text-[13px] text-[#242424]">31 Dec 2022 - 9 Jan 2023</p>
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-x-2">
              <div className="w-[7px] h-[7px] rounded-full bg-[#9AB044]"></div>
              <p className="text-[12px] text-[#242424]">Sanur Beach</p>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="w-[7px] h-[7px] rounded-full bg-[#9AB044]"></div>
              <p className="text-[12px] text-[#242424]">Pura Tirta Empul</p>
            </div>
          </div>
          <div className="flex items-center gap-x-3 text-[12px]">
            <button className="w-[133px] h-[32px] rounded-md bg-[#009DE2] text-white hover:bg-transparent border hover:border-[#009DE2] hover:text-[#2D2D2D]">Automate My Trip</button>
            <button className="w-[106px] h-[32px] rounded-md text-[#2D2D2D] border border-[#2D2D2D]">More Info</button>
          </div>
        </div>
          )
        })}
      </div>
    </div>
  );
}
