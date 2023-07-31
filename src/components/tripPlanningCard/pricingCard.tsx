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
  filteredLocations
}: IPlanningCard) {

  return variation === "cards" ? (
    <div className="relative bg-[#F6FDFF] rounded-lg border-2 border-dashed border-[#AEDCF0] px-5 py-8">
      <div className={`${data.loading ? "blur-sm select-none" : ""}`}>
        <h1 className="text-2xl font-bold">{data.day}</h1>
        {rows == "2" ? (
          <>
            <div className="w-full bg-white rounded-lg border border-dashed border-[#AEDCF0] mt-4">
              <div className="p-5 flex flex-col justify-between">
                {data &&
                  data.times.slice(0,5).map((time: any, index: any) => {
                    let time_location = data.locations?.filter((location: any) => 
                      (location.place_id && location.place_id != "") ? 
                        location.current_opening_hours?.weekday_text.filter( (weekd: any) => weekd.search(time) !== -1 ) : 
                        location.hours?.weekday_text.filter( (weekd: any) => weekd.search(time) !== -1 )
                    )
                    const onDropFunc = (e: React.DragEvent<HTMLDivElement>) => {
                      console.log(e.dataTransfer.getData('product'))
                    }
                    
                    if(time_location && time_location?.length > 0) {
                      return time_location.map((locat: any, index2: number) => {
                        return (
                          <div
                            key={index2}
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
                                onOpen(locat);
                              }}
                            >
                              <h1 className="gilroy font-semibold">
                                {time} -{" "}
                              </h1>
                              <p className="font-medium">{locat.name}</p>
                            </span>
                          </div>
                        );
                      })
                    }
                    else
                    {
                      return <></>;
                    }
                  })}
              </div>
            </div>
            {/* <div className="w-full bg-white rounded-lg border border-dashed border-[#AEDCF0] mt-4">
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
            </div> */}
          </>
        ) : (
          <div className="w-full bg-white rounded-lg border border-dashed border-[#AEDCF0] mt-4">
            <div className="p-5 flex flex-col justify-between">
              {data.times &&
                data.times.slice(0,4).map((items: any, index: any) => {

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
                          onOpen({});
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
          {data.day}
          {/* <span className="w-[38px] h-[29px] text-[var(--green)] bg-[var(--lite-green)] flex justify-center items-center rounded-lg">
            {data.day}
          </span>{" "} */}
        </span>
      </div>
      <div className="col-span-5">
        <div className="pl-5 flex flex-col justify-between">
          {data.times &&
            data.times.slice(0,5).map((time: any, index: any) => {

              let time_location = data.locations?.filter((location: any) => 
                (location.place_id && location.place_id != "") ? 
                  location.current_opening_hours?.weekday_text.filter( (weekd: any) => weekd.search(time) !== -1 ) : 
                  location.hours?.weekday_text.filter( (weekd: any) => weekd.search(time) !== -1 )
                )
                if(time_location && time_location?.length > 0) {
                  return time_location.map((locat: any, index2: number) => {
                    return (
                      <ScheduleCard
                        key={index2}
                        isDropdownButton={isDropdownButton}
                        onOpen={onOpen}
                        time={time}
                        items={locat}
                      />
                    );
                })
              }
            })}
        </div>
      </div>
    </div>
  );
}
