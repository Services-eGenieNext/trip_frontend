import React,{useState, useRef,useEffect} from "react";
import CSS from './tripPlanning.module.css'
import { IPlanningCard } from "@/interfaces/TripPlan";
import InputField from "../UIComponents/InputField/InputField";

export default function ScheduleCard({items, isDropdownButton, onOpen}:IPlanningCard) {
    const [isShowTooltip, setIsShowTooltip] = useState(false);
    const [editTime, setEditTime] = useState(false)
    const [deleteTime, setDeleteTime] = useState(false)
    const [addEvent, setAddEvent] = useState(false)
    const [addNewEventValue, setaddNewEventValue] = useState("")

    const onDropFunc = (e: React.DragEvent<HTMLDivElement>) => {
      console.log(e.dataTransfer.getData('product'))
    }

  return (
    <div
      className={`flex gap-x-4 mb-10 cursor-pointer h-full ${CSS["pricingCard"]}`}

      onDrop={(e) => onDropFunc(e)}
      onDragOver={(e) => {e.preventDefault()}}
    >
      <div className="mt-6">
        <div>
          <div className="w-[20px] h-[20px] bg-[#AEDCF0] rounded-full flex justify-center items-center">
            <div className="w-[10px] h-[10px] bg-[#009DE2] rounded-full"></div>
          </div>
        </div>
        <div className={`h-full ml-2 ${CSS["divider"]}`} />
      </div>
      <span
        className={`text-[13px] max-w-[259px] w-full text-black hover:text-[#009DE2] p-4 rounded-lg flex justify-between items-center gap-2 ${CSS["plan-time-wrapper"]}`}
        onClick={() => {
          onOpen(items);
        }}
      >
        <p className="gilroy font-semibold">{items.time} -  asfds</p>
        <div className="flex flex-wrap justify-center items-center">
          <p className="font-medium w-[100px]">{items.detail}</p>
          {isDropdownButton == true ? (
            <div className="relative">
            <span
              className={`w-[18px] h-[13px] rounded ${CSS["svg"]}`}
              onClick={() => {
                setIsShowTooltip(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[14px] h-[12px] mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
              {isShowTooltip === true && (
                <div className="absolute top-2 right-0 w-[122px] h-[110px] rounded-md shadow-lg border z-10 bg-white flex flex-col justify-between py-3 px-4">
                    <p className="text-black hover:text-[#9AB044]" onClick={()=>{
                        setIsShowTooltip(false)
                        setEditTime(true)
                    }}>Edit time</p>
                    <p className="text-black hover:text-[#9AB044]" onClick={()=>{
                        setIsShowTooltip(false)
                        setDeleteTime(true)
                    }}>Delete event</p>
                    <p className="text-black hover:text-[#9AB044]" onClick={()=>{
                        setIsShowTooltip(false)
                        setAddEvent(true)
                        }}>Add event</p>
                </div>
              )}
              {addEvent === true && (
                <div className="absolute top-2 -right-40 sm:w-[462px] rounded-md shadow-lg border z-10 bg-white flex flex-col justify-center py-10 px-8 text-black">
                <InputField type="text" label="Add Destination" placeholder='Which place are you suggesting?' value={addNewEventValue} onChange={(e) => setaddNewEventValue(e.target.value)} />
                <div className="mt-4 w-full" onClick={()=>{console.log(addNewEventValue)}}>
                <button className="w-full font-bold text-[18px] bg-[#009DE2] text-white py-3 rounded-lg" onClick={()=>{
                    setAddEvent(false)
                    setaddNewEventValue("")
                    }}>Add Now</button>
                </div>
            </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </span>
    </div>
  );
}
