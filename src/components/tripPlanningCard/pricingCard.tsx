import React, { useEffect, useState } from "react";
import CSS from "./tripPlanning.module.css";
import { FiLock } from "react-icons/fi";
import { IPlanningCard } from "@/interfaces/TripPlan";
import ScheduleCard from "./scheduleCard";
import { LocationsDurationCall } from "@/api-calls";
import PricingCardLocation from "./pricing-cards/pricing-card-location";

export default function PricingCard({
  data,
  onOpen = () => {},
  variation = "cards",
  rows,
  isDropdownButton
}: IPlanningCard) {

  const [days, setDays] = useState<any>({
    day: "Monday",
    times: [],
    locations: []
  })

  useEffect(() => {
    setDays(data)
  }, [data])

  return variation === "cards" ? (
    <div className="relative bg-[#F6FDFF] rounded-lg border-2 border-dashed border-[#AEDCF0] px-5 py-8">
      <div className={`${data.loading ? "blur-sm select-none" : ""}`}>
        
        <h1 className="text-2xl font-bold">{data.day}</h1>
        
        <div className="w-full bg-white rounded-lg border border-dashed border-[#AEDCF0] mt-4">
            <div className="p-5 flex flex-col justify-between">
              {
                days &&
                days.times.map((time: any, index: any) => {

                  let origin = null
                  let destination = null
                  if(index > 0 && days.times[index - 1])
                  {
                    origin = days.times[index - 1].location.place_id ? days.times[index - 1].location.formatted_address : days.times[index - 1].location.address_obj.address_string
                    
                    destination = days.times[index].location.place_id ? days.times[index].location.formatted_address : days.times[index].location.address_obj.address_string
                  }

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

                  return <PricingCardLocation key={index}
                  distanceObject={{origin: origin, destination: destination}}
                  index={index}
                  days={days}
                  rows={rows}
                  time={time}
                  onOpen={(_item) => onOpen(_item)} />
                })
              }

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

            </div>
          </div>
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
    <div className={`grid ${ variation === "cards-list" ? 'grid-cols-1 bg-[#F6FDFF] rounded-lg border-2 border-dashed border-[#AEDCF0] py-5' : 'grid-cols-6'} mb-5`}>
      <div className={`${variation === "cards-list" ? 'pl-5' : 'col-span-1'} w-[90px] select-none`}>
        <span className={`uppercase ${variation === "cards-list" ? 'font-semibold' : 'flex flex-col md:flex-row justify-between items-center text-sm md:text-base  bg-[var(--lite-green)] rounded-xl px-3'} w-max`}>
          {data.day}
          {/* <span className="w-[38px] h-[29px] text-[var(--green)] bg-[var(--lite-green)] flex justify-center items-center rounded-lg">
            {data.day}
          </span>{" "} */}
        </span>
      </div>
      <div className={variation === "cards-list" ? '' : `col-span-5`}>
        <div className="pl-5 flex flex-col justify-between">
          {data.times &&
            data.times.map((time: any, index: any) => {
              let origin = null
              let destination = null
              if(index > 0 && data.times[index - 1])
              {
                origin = data.times[index - 1].location.place_id ? data.times[index - 1].location.formatted_address : data.times[index - 1].location.address_obj.address_string
                
                destination = data.times[index].location.place_id ? data.times[index].location.formatted_address : data.times[index].location.address_obj.address_string
              }
                return (
                  <ScheduleCard
                    variation={variation}
                    day={data.day}
                    distanceObject={{origin: origin, destination: destination}}
                    key={index}
                    isDropdownButton={isDropdownButton}
                    onOpen={(_item) => onOpen(_item)}
                    time={time}
                    items={time.location}
                  />
                );
            })}
        </div>
      </div>
    </div>
  );
}
