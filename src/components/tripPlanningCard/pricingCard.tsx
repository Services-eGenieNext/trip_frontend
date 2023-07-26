import React, { useState } from "react";
import CSS from "./tripPlanning.module.css";
import { FiLock } from "react-icons/fi";
import { IPlanningCard } from "@/interfaces/TripPlan";
import ScheduleCard from "./scheduleCard";

export default function PricingCard({
  data,
  onOpen = () => {},
  variation = "cards",
  rows,
  isDropdownButton,
}: IPlanningCard) {
  return variation === "cards" ? (
    <div className="relative mt-10 bg-[#F6FDFF] rounded-lg border-2 border-dashed border-[#AEDCF0] px-5 py-8">
      <div className={`${data.active == false ? "blur-sm select-none" : ""}`}>
        <h1 className="text-2xl font-bold">DAY - {data.day}</h1>
        {rows == "2" ? (
          <>
            <div className="w-full bg-white rounded-lg border border-dashed border-[#AEDCF0] mt-4">
              <div className="p-5 flex flex-col justify-between">
                {data.schedule &&
                  data.schedule.map((items: any, index: any) => {


                    const onDropFunc = (e: React.DragEvent<HTMLDivElement>) => {
                      console.log(e.dataTransfer.getData('product'))
                    }

                    return (
                      <div
                        key={index}
                        className={`flex gap-x-4 mb-10 cursor-pointer h-full ${CSS["pricingCard"]}`}
                        onDrop={(e) => onDropFunc(e)}
                        onDragOver={(e) => {e.preventDefault()}}
                      >
                        <div>
                          <div>
                            <div className="w-[20px] h-[20px] bg-[#AEDCF0] rounded-full flex justify-center items-center">
                              <div className="w-[10px] h-[10px] bg-[#009DE2] rounded-full"></div>
                            </div>
                          </div>
                          <div
                            className={`h-full ml-2 ${CSS["divider"]}`}
                          ></div>
                        </div>
                        <span
                          className="text-[13px] text-black hover:text-[#009DE2]"
                          onClick={() => {
                            onOpen(items);
                          }}
                        >
                          <h1 className="gilroy font-semibold">
                            {items.time} -{" "}
                          </h1>
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
                      <ScheduleCard
                        key={index}
                        isDropdownButton={isDropdownButton}
                        onOpen={onOpen}
                        items={items}
                      />
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full bg-white rounded-lg border border-dashed border-[#AEDCF0] mt-4">
            <div className="p-5 flex flex-col justify-between">
              {data.schedule &&
                data.schedule.map((items: any, index: any) => {

                  const onDropFunc = (e: React.DragEvent<HTMLDivElement>) => {
                    e.preventDefault()
                    let detail: any = e.dataTransfer.getData('product')
                    let detailEle: HTMLElement | null = document.getElementById(`detail_${data.day + index}`)
                    if(detail && detailEle && detailEle !== undefined)
                    {
                      detail = JSON.parse(detail)
                      detailEle.innerHTML = detail.name
                    }
                  }

                  return (
                    <div
                      key={index}
                      className={`flex gap-x-4 mb-10 cursor-pointer h-full ${CSS["pricingCard"]}`}
                      onDrop={(e) => onDropFunc(e)}
                      onDragOver={(e) => {e.preventDefault()}}
                    >
                      <div>
                        <div>
                          <div className="w-[20px] h-[20px] bg-[#AEDCF0] rounded-full flex justify-center items-center">
                            <div className="w-[10px] h-[10px] bg-[#009DE2] rounded-full"></div>
                          </div>
                        </div>
                        <div className={`h-full ml-2 ${CSS["divider"]}`}></div>
                      </div>
                      <span
                        className="text-[13px] text-black hover:text-[#009DE2]"
                        onClick={() => {
                          onOpen(items);
                        }}
                      >
                        <h1 className="gilroy font-semibold">
                          {items.time} -{" "}
                        </h1>
                        <p className="font-medium" id={`detail_${data.day + index}`}>{items.detail}</p>
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
      {data && data.active == false ? (
        <div
          className={`absolute top-0 right-0 p-5 w-full h-full flex justify-end items-start select-none ${CSS["overlay"]}`}
        >
          <div className="flex items-center gap-x-3">
            <h1 className="font-medium">Unlock</h1>
            <div className="w-[40px] h-[40px] rounded-full bg-[#009DE2] text-white flex justify-center items-center font-bold">
              <FiLock />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  ) : (
    <div className="grid grid-cols-6 my-10">
      <div className="col-span-1">
        <span className="uppercase flex flex-col md:flex-row justify-between items-center text-sm md:text-base">
          Day -{" "}
          <span className="w-[38px] h-[29px] text-[var(--green)] bg-[var(--lite-green)] flex justify-center items-center rounded-lg">
            {data.day}
          </span>{" "}
        </span>
      </div>
      <div className="col-span-5">
        <div className="pl-5 flex flex-col justify-between">
          {data.schedule &&
            data.schedule.map((items: any, index: any) => {
              return (
                <ScheduleCard
                  key={index}
                  isDropdownButton={isDropdownButton}
                  onOpen={onOpen}
                  items={items}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
