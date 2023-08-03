import React, { useState, useEffect } from "react";
import InputField from "../UIComponents/InputField/InputField";
import SimpleLocation from "../icons/SimpleLocation";
import CalenderIcon from "../icons/Calender";
import BlueButton from "../UIComponents/Buttons/BlueButton";
import SelectField from "../UIComponents/InputField/SelectField";
import Occasion from "@/data/occasion.json";
import LocationJson from '@/data/location.json'
import Travelers from "@/data/travelers.json";
import Priority from "@/data/priority.json";
import DateRangeField from "../UIComponents/InputField/DateRangeField";
import styles from "./hero.module.css";
import { Range } from "react-date-range";
import { addDays } from "date-fns";
import { useRouter } from 'next/navigation'
import { useAppDispatch } from "@/redux/hooks";
import { setSurveyValue } from "@/redux/reducers/surveySlice";
import { setLocations } from "@/redux/reducers/locationSlice";
import MultiSelectDropdown from '@/components/UIComponents/MultiSelectDropdown'

export default function HeroFilterSection() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [date, setDate] = useState<Range>({
    key: "selection",
  });

  const [locationSearch, setLocationSearch] = useState<any>({
    location: "",
    occassion: [],
    priority: [],
    person: "",
    dates: "",
  });

  const route = useRouter()

  useEffect(()=>{
    setLocationSearch({...locationSearch, dates: date})
      },[date])

  const handleRoute = () => {
    if(locationSearch.dates.startDate){
      router.push('/trip-plan?address='+locationSearch.location)
    }else{
      route.push(`/results?address=${locationSearch.location}`)
      dispatch(setSurveyValue(locationSearch))
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
      <SelectField
                label="Trending Location"
                placeholder="Select ..."
                data={LocationJson}
                className={`mr-2 sm:my-2 my-5 sm:w-[200px]`}
                styling={{
                  shadow: "drop-shadow-xl ",
                  left: "0px",
                  top: "70px",
                }}
                value={locationSearch.location}
                onChange={(val) =>
                  setLocationSearch({ ...locationSearch, location: val })
                }
                onAdditionalChange={(_data) => {}}
              />

      {/* <InputField
        label="Location"
        type="text"
        className={`mr-2 my-2 sm:w-[200px] ${styles.inputWrapper}`}
        value={locationSearch.location}
        onChange={(e) =>
          setLocationSearch({ ...locationSearch, location: e.target.value })
        }
        icon={<SimpleLocation />}
      /> */}

      {/* <InputField 
                                label="Date" 
                                type="text" 
                                className={`mr-2 my-2 w-[200px] ${styles.inputWrapper}`}  
                                value={locationSearch.startDate} 
                                onChange={(e) => setLocationSearch({...locationSearch, startDate: e.target.value})} 
                                icon={<CalenderIcon />} 
                            /> */}

      <DateRangeField
        label="Select ..."
        placeholder="Select ..."
        className={`mr-2 sm:my-2 my-5 sm:w-[250px] ${styles.inputWrapper}`}
        value={date}
        onChange={(value) => setDate(value)}
        icon={<CalenderIcon />}
      />

<MultiSelectDropdown
        searchBar
        items={Occasion}
        Label={"Occasion"}
        heightItemsContainer="300px"
        // SelectedData={locationSearch.occasion ? locationSearch.occasion : []}
        placeholder="Select..."
        onChange={(val: any) =>
          setLocationSearch({ ...locationSearch, occassion: val })
        }
      />

<MultiSelectDropdown
        searchBar
        items={Priority}
        Label={"Priority"}
        heightItemsContainer="300px"
        // SelectedData={locationSearch.priority}
        placeholder="Select..."
        onChange={(val: any) =>
          setLocationSearch({ ...locationSearch, occassion: val })
        }
      />

      <SelectField
        label="Travelers"
        placeholder="Select ..."
        data={Travelers}
        className={`mr-2 sm:my-2 my-5 sm:w-[150px] ${styles.inputWrapper}`}
        value={locationSearch.travelers}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, person: val })
        }
        onAdditionalChange={(_data) => {}}
      />

      <BlueButton title="Automate My trip" className="sm:w-[200px] w-full" onClick={handleRoute} />
    </div>
  );
}
