import React,{useState, useRef,useEffect} from "react";
import CSS from './tripPlanning.module.css'
import { IPlanningCard } from "@/interfaces/TripPlan";
import InputField from "../UIComponents/InputField/InputField";
import { LocationsDurationCall } from "@/api-calls";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setItineraryDays } from "@/redux/reducers/itinerarySlice";

interface IScheduleCard extends IPlanningCard {
  distanceObject?: any
  time?: any
  day: string
}

export default function ScheduleCard({day, distanceObject, items, isDropdownButton, onOpen, time}:IScheduleCard) {
    const [isShowTooltip, setIsShowTooltip] = useState(false);
    const [editTime, setEditTime] = useState(false)
    const [deleteTime, setDeleteTime] = useState(false)
    const [addEvent, setAddEvent] = useState(false)
    const [addNewEventValue, setaddNewEventValue] = useState("")

    const initialEditTimeFormValues = {startTime: "", endTime: ""}
    const [editTimeForm, setEditTimeForm] = useState(initialEditTimeFormValues)
    const [suggestedLocation, setSuggestedLocation] = useState('')
    const [duration, setDuration] = useState(null)

    const { itineraryDays } = useAppSelector(state => state.itineraryReducer)

    const onDropFunc = (e: React.DragEvent<HTMLDivElement>) => {
      console.log(e.dataTransfer.getData('product'))
    }

    function formatTime(timeString: string) {
      if(timeString == "" || timeString.search('Open') !== -1)
      {
          return timeString
      }

      const [hourString, minute] = timeString.split(":");

      return (Number(hourString) % 12 || 12) + ":" + (Number(minute.substring(0,2)) < 10 ? '0'+Number(minute.substring(0,2)) : minute) + (Number(hourString) < 12 ? " AM" : " PM");
    }

    const dispatch = useAppDispatch()

    const ChangeTimeFunc = () => {

      let _itineraryDays = [...itineraryDays]
      let dayIndex = _itineraryDays.findIndex(itinerary => itinerary.day === day)
      let timeIndex = _itineraryDays[dayIndex].times.findIndex(_time => _time.location.name === items.name)
      _itineraryDays[dayIndex] = {..._itineraryDays[dayIndex]}
      _itineraryDays[dayIndex].times = [..._itineraryDays[dayIndex].times]
      _itineraryDays[dayIndex].times[timeIndex] = {..._itineraryDays[dayIndex].times[timeIndex]}
      _itineraryDays[dayIndex].times[timeIndex].suggestedTime = {..._itineraryDays[dayIndex].times[timeIndex].suggestedTime, startTime: editTimeForm.startTime, endTime: editTimeForm.endTime}

      dispatch(setItineraryDays([..._itineraryDays]))
      setEditTime(false)
      setIsShowTooltip(false)
      setEditTimeForm(initialEditTimeFormValues)
    
    }

    useEffect(() => {
      const _def = async () => {
        let duration = await LocationsDurationCall(distanceObject.origin, distanceObject.destination)
        console.log('duration found', duration)
        if(duration.status == 200 && duration.data.rows[0]?.elements[0]?.duration?.text)
        {
          setDuration(duration.data.rows[0].elements[0].duration.text)
        }
      }
      if(distanceObject.origin && distanceObject.destination && (!time.suggestedTime?.duration_time || time.suggestedTime?.duration_time == ""))
      {
        _def()
      }
    }, [distanceObject])

  return (
    <>
    {
      (time.suggestedTime?.duration_time || duration) && <span className="flex rounded-full px-2 h-max bg-[var(--blue)] text-white text-[12px] whitespace-nowrap w-max -translate-y-full">{time.suggestedTime?.duration_time ? time.suggestedTime?.duration_time : duration}</span>
    }
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
          let number = document.querySelector('body .width')?.scrollHeight ?? 0
          window.scrollTo(0, number)
        }}
      >
        <p className="gilroy text-[11px] font-semibold">{
              !time.suggestedTime?.startTime && !time.suggestedTime?.endTime ? (
                  time.time
              ) : (
                  (time.suggestedTime?.startTime ? (formatTime(time.suggestedTime.startTime)+ ' ') : " ") + (time.suggestedTime?.endTime ? '- '+(formatTime(time.suggestedTime.endTime)) : "")
              )
          } - </p>
        <div className="flex justify-between items-center">
          <p className="font-medium w-[90px]">{suggestedLocation ? suggestedLocation : items.name}</p>
          {isDropdownButton == true ? (
            <div className="relative">
              <span
                className={`w-[18px] block h-[13px] rounded ${CSS["svg"]}`}
                onClick={() => {
                  setIsShowTooltip(!isShowTooltip);
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
              {
                isShowTooltip === true && (
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
                )
              }
              {
                editTime === true && (
                  <div className="absolute top-2 right-0 sm:w-[462px] rounded-md shadow-lg border z-10 bg-white flex flex-col justify-center py-10 px-8 text-black max-w-[200px]">
                    
                    <InputField type="time" label="Opening Time" className="my-2" placeholder='Which place are you suggesting?' value={editTimeForm.startTime} onChange={(e) => setEditTimeForm({...editTimeForm, startTime: e.target.value})} />

                    <InputField type="time" label="Closing Time" className="my-2" placeholder='Which place are you suggesting?' value={editTimeForm.endTime} onChange={(e) => setEditTimeForm({...editTimeForm, endTime: e.target.value})} />

                    <div className="mt-4 w-full">
                      <button className="w-full font-bold text-[14px] bg-[#009DE2] text-white py-2 rounded-lg" onClick={()=> {
                        ChangeTimeFunc()
                        }}>Change Time</button>
                    </div>
                    
                  </div>
                )
              }
            </div>
          ) : (
            ""
          )}
        </div>
      </span>
    </div>
    </>
  );
}
