import React from "react";
import CSS from "./tripPlanning.module.css";
import { FiLock } from "react-icons/fi";
import { IPlanningCard } from "@/interfaces/TripPlan";

export default function PricingCard({ data , onOpen = () => {}, variation = "cards"}: IPlanningCard) {
    return (
        variation === "cards" ?
        <div className="relative mt-10 bg-[#F6FDFF] rounded-lg border-2 border-dashed border-[#AEDCF0] px-5 py-8">
            <div className={`${data.active == false ? "blur-sm select-none" : ""}`}>
                <h1 className="text-2xl font-bold">DAY - {data.day}</h1>
                <div className="w-full bg-white rounded-lg border border-dashed border-[#AEDCF0] mt-4">
                <div className="p-5 flex flex-col justify-between">
                    {data.schedule &&
                    data.schedule.map((items: any, index: any) => {
                        return (
                        <div
                            key={index}
                            className={`flex gap-x-4 mb-10 cursor-pointer h-full ${CSS["pricingCard"]}`}
                        >
                            <div>
                            <div>
                                <div className="w-[20px] h-[20px] bg-[#AEDCF0] rounded-full flex justify-center items-center">
                                <div className="w-[10px] h-[10px] bg-[#009DE2] rounded-full"></div>
                                </div>
                            </div>
                            <div className={`h-full ml-2 ${CSS["divider"]}`}></div>
                            </div>
                            <span className="text-[13px] text-black hover:text-[#009DE2]"
                            onClick={() => {
                            onOpen(items)
                            }}
                            >
                            <h1 className="gilroy font-semibold">{items.time} - </h1>
                            <p className="font-medium">{items.detail}</p>
                            </span>
                        </div>
                        );
                    })}
                </div>
                </div>
                <div className="w-full bg-white rounded-lg border border-dashed border-[#AEDCF0] mt-4">
                <div
                    className={`p-5 flex flex-col justify-between ${CSS["pricing"]}`}
                >
                    {data.schedule &&
                    data.schedule.map((items: any, index: any) => {
                        return (
                        <div
                            key={index}
                            className={`flex gap-x-4 mb-10 cursor-pointer h-full ${CSS["pricingCard"]}`}
                        >
                            <div>
                            <div>
                                <div className="w-[20px] h-[20px] bg-[#AEDCF0] rounded-full flex justify-center items-center">
                                <div className="w-[10px] h-[10px] bg-[#009DE2] rounded-full"></div>
                                </div>
                            </div>
                            <div className={`h-full ml-2 ${CSS["divider"]}`}></div>
                            </div>
                            <div className="text-[13px] text-black hover:text-[#009DE2]">
                            <h1 className="gilroy font-semibold">{items.time} - </h1>
                            <p className="font-medium">{items.detail}</p>
                            </div>
                        </div>
                        );
                    })}
                </div>
                </div>
            </div>
            {data && data.active == false ? (
            <div className={`absolute top-0 right-0 p-5 w-full h-full flex justify-end items-start select-none ${CSS["overlay"]}`}>
                <div className="flex items-center gap-x-3">
                <h1 className="font-medium">Unlock</h1>
                <div className="w-[40px] h-[40px] rounded-full bg-[#009DE2] text-white flex justify-center items-center font-bold">
                <FiLock />
                </div>
                </div>
            </div>
            ):(
                ""
            )}
        </div>
        : 
        <div className="grid grid-cols-6 my-10">
            <div className="col-span-1">
                <span className="uppercase flex flex-col md:flex-row justify-between items-center text-sm md:text-base">Day - <span className="w-[38px] h-[29px] text-[var(--green)] bg-[var(--lite-green)] flex justify-center items-center rounded-lg">{data.day}</span> </span>
            </div>
            <div className="col-span-5">
                <div className="pl-5 flex flex-col justify-between">
                    {data.schedule &&
                    data.schedule.map((items: any, index: any) => {
                        return (
                        <div
                            key={index}
                            className={`flex gap-x-4 mb-10 cursor-pointer h-full ${CSS["pricingCard"]}`}
                        >
                            <div className="mt-6">
                                <div>
                                    <div className="w-[20px] h-[20px] bg-[#AEDCF0] rounded-full flex justify-center items-center">
                                    <div className="w-[10px] h-[10px] bg-[#009DE2] rounded-full"></div>
                                    </div>
                                </div>
                                <div className={`h-full ml-2 ${CSS["divider"]}`} />
                            </div>
                            <span className={`text-[13px] max-w-[259px] w-full text-black hover:text-[#009DE2] p-4 rounded-lg flex justify-between items-center gap-2 ${CSS["plan-time-wrapper"]}`}
                            onClick={() => {
                                onOpen(items)
                            }} >
                                <p className="gilroy font-semibold">{items.time} - </p>
                                <div className="flex flex-wrap justify-center items-center">
                                    <p className="font-medium w-[100px]">{items.detail}</p>
                                    <span className={`w-[18px] h-[13px] rounded ${CSS['svg']}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[14px] h-[12px] mx-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </span>
                                </div>
                            </span>
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
