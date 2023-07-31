import React, { useState, useEffect } from "react";
import InputField from "../UIComponents/InputField/InputField";
import SimpleLocation from "../icons/SimpleLocation";
import CalenderIcon from "../icons/Calender";
import BlueButton from "../UIComponents/Buttons/BlueButton";
import SelectField from "../UIComponents/InputField/SelectField";
import Occasion from "@/data/occasion.json";
import Travelers from "@/data/travelers.json";
import Priority from "@/data/priority.json";
import DateRangeField from "../UIComponents/InputField/DateRangeField";
import styles from "./pageBanner.module.css";
import { Range } from "react-date-range";
import { addDays } from "date-fns";
import { setLocations } from '@/redux/reducers/locationSlice'
import { LocationsCall, ReviewsCall } from '@/api-calls'
import { useAppDispatch } from '@/redux/hooks'
import { useRouter } from "next/navigation";

export default function HeroFilterSection({surveyData}:any) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [date, setDate] = useState<any>({
    key: "selection",
  });

  const [locationSearch, setLocationSearch] = useState<any>({
    location: "",
    occassion: "",
    activities: "",
    travelers: "",
    dates:"",
  });

  useEffect(()=>{
setLocationSearch({...locationSearch, location: surveyData.location, occassion: surveyData.occassion, activities: surveyData.activities})
  },[surveyData])

  useEffect(()=>{
setLocationSearch({...locationSearch, dates: date})
  },[date])

  const _def = async () => {
    if(surveyData.location !== ""){
      let res = await LocationsCall(`best locations in ${locationSearch.location}`)
      console.log("locations from results filters",res)
      dispatch(setLocations(res))
    }
}
//   useEffect(()=>{
// if(locationSearch.location !== ""){
// _def()
// }
//   },[locationSearch])

  const handleRoute = () => {
    if(locationSearch.dates.startDate){
      console.log(locationSearch.dates,"dates test")
      router.push('/trip-plan?address='+locationSearch.location)
    }else{
      console.log(locationSearch.dates,"dates test")
      _def()
    }
  }

  const [openAdvanceSearch, setOpenAdvanceSearch] = useState(false);
  return (
    <div
      //   id={styles.filter}
      className={`bg-white p-8 sm:flex block flex-wrap justify-center rounded-xl sm-width`}
    >
      {/* <span
        className="absolute top-2 right-2"
        onClick={() => setOpenAdvanceSearch(!openAdvanceSearch)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span> */}

      <InputField
        label="Location"
        type="text"
        className={`mr-2 my-2 sm:w-[200px] ${styles.inputWrapper}`}
        value={locationSearch.location}
        onChange={(e) =>
          setLocationSearch({ ...locationSearch, location: e.target.value })
        }
        icon={<SimpleLocation />}
      />

      {/* <InputField 
                                label="Date" 
                                type="text" 
                                className={`mr-2 my-2 w-[200px] ${styles.inputWrapper}`}  
                                value={locationSearch.startDate} 
                                onChange={(e) => setLocationSearch({...locationSearch, startDate: e.target.value})} 
                                icon={<CalenderIcon />} 
                            /> */}

      <DateRangeField
        label="Date"
        className={`mr-2 sm:my-2 my-5 sm:w-[250px] ${styles.inputWrapper}`}
        value={date}
        onChange={(value) => setDate(value)}
        icon={<CalenderIcon />}
      />

      <SelectField
        label="Occassion"
        placeholder="Select ..."
        data={Occasion}
        className={`mr-2 sm:my-2 my-5 sm:w-[200px] ${styles.inputWrapper}`}
        value={locationSearch.occassion}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, occassion: val })
        }
        onAdditionalChange={(_data) => {}}
      />

      <SelectField
        label="Priority"
        placeholder="Select ..."
        data={Priority}
        className={`mr-2 sm:my-2 my-5 sm:w-[150px] ${styles.inputWrapper}`}
        value={locationSearch.activities}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, activities: val })
        }
        onAdditionalChange={(_data) => {}}
      />

      <SelectField
        label="Person"
        placeholder="Select ..."
        data={Travelers}
        className={`mr-2 sm:my-2 my-5 sm:w-[150px] ${styles.inputWrapper}`}
        value={locationSearch.travelers}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, travelers: val })
        }
        onAdditionalChange={(_data) => {}}
      />

      <SelectField
        label="Spending"
        placeholder="Select ..."
        data={Travelers}
        className={`mr-2 sm:my-2 my-5 sm:w-[150px] ${styles.inputWrapper}`}
        value={locationSearch.travelers}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, travelers: val })
        }
        onAdditionalChange={(_data) => {}}
      />

      <BlueButton title="Automate My trip" className="sm:w-[200px] w-full" onClick={handleRoute} />
    </div>
  );
}
