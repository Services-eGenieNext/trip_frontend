import React, { useEffect, useState } from "react";
import Image from "next/image";
import PlaceImg from "/public/images/placeImg_01.png";
import { FilledStar } from "../icons/Stars";
import BlankLocation from "public/images/blank-location.jpg";

export default function Lisitngs({ locations }: any) {
  const skelton = ["1", "2", "3", "4", "5", "6", "7", "8","9"];
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  useEffect(() => {
    setLoading(true)
    setResults(locations);
  }, [locations]);

  useEffect(() => {
    if (results.length > 0) {
      setLoading(false);
    }
  }, [results]);
  return (
    <div className="lg:px-12 md:px-12 sm:px-6 px-3">
      <p className="text-[18px] text-[#3F3F3F]">
        Show listing of {results ? results.length : "0"} Places...
      </p>
      <div className="flex flex-wrap itemns-center lg:justify-between justify-center my-8 gap-y-14 gap-x-3">
        {loading === true
          ? skelton.map((show: any, index: number) => {
              return (
                <div
                  key={index}
                  role="status"
                  className="rounded shadow animate-pulse dark:border-gray-700 sm:w-[260px] w-[320px] overflow-hidden rounded-lg flex flex-col justify-between sm:items-start items-center"
                >
                  <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700 w-full relative">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                  <div className="h-[25px] bg-white rounded-full dark:bg-gray-700 w-[50px] absolute top-2 right-2 z-10"></div>
                  </div>
                  <div className="w-full">
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 mx-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 mx-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mx-4"></div>
                  <div className="flex items-center my-4 space-x-3 mx-4">
                  <div className="h-[32px] bg-gray-200 rounded-md dark:bg-gray-700 w-[106px]"></div>
                  <div className="h-[32px] bg-gray-200 rounded-md dark:bg-gray-700 w-[106px]"></div>
                  </div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              );
            })
          : (
    results?.map((location: any, index:number) => {
                let image_path =
                  location?.images === "" ? BlankLocation.src : location.images
                return (
                  <div
                    key={index}
                    className="sm:w-[260px] w-[320px] overflow-hidden rounded-lg flex flex-col justify-between sm:items-start items-center"
                  >
                    <div className="sm:h-[235px] h-[260px] w-full relative">
                    <img src={image_path} alt={image_path} style={{objectFit: "cover"}} className="h-full w-full" />
                      <div className="absolute top-2 right-2 flex items-center gap-x-2 bg-white py-1 px-4 rounded-full">
                        <FilledStar />
                        <p className="text-[#009DE2] font-semibold">{location.rating}</p>
                      </div>
                    </div>
                    <p className="text-[22px] font-semibold text-[#2D2D2D] mt-2 sm:text-start text-center">
                    {location.formatted_address}
                    </p>
                    <p className="text-[13px] text-[#242424] mt-2">
                      31 Dec 2022 - 9 Jan 2023
                    </p>
                    <div className="grid grid-cols-2 mt-2">
                      <div className="flex items-center gap-x-2">
                        <div className="w-[7px] h-[7px] rounded-full bg-[#9AB044]"></div>
                        <p className="text-[12px] text-[#242424]">Sanur Beach</p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <div className="w-[7px] h-[7px] rounded-full bg-[#9AB044]"></div>
                        <p className="text-[12px] text-[#242424]">
                          Pura Tirta Empul
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-3 text-[12px] mt-2">
                      <button className="w-[133px] h-[32px] rounded-md bg-[#009DE2] text-white hover:bg-transparent border hover:border-[#009DE2] hover:text-[#2D2D2D]">
                        Automate My Trip
                      </button>
                      <button className="w-[106px] h-[32px] rounded-md text-[#2D2D2D] border border-[#2D2D2D]">
                        More Info
                      </button>
                    </div>
                  </div>
                );
              })
          )}
      </div>
    </div>
  );
}
