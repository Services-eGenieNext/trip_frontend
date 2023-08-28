import React, { useState, useEffect } from "react";
import InputField from "../UIComponents/InputField/InputField";
import SimpleLocation from "../icons/SimpleLocation";
import CalenderIcon from "../icons/Calender";
import BlueButton from "../UIComponents/Buttons/BlueButton";
import SelectField from "../UIComponents/InputField/SelectField";
import Occasion from "@/data/occasion.json";
import LocationJson from "@/data/location.json";
import SpendingValue from '@/data/spending.json'
import Travelers from "@/data/travelers.json";
import Priority from "@/data/priority.json";
import DateRangeField from "../UIComponents/InputField/DateRangeField";
import styles from "./hero.module.css";
import { Range } from "react-date-range";
import { addDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useAppDispatch,useAppSelector } from "@/redux/hooks";
import { setSurveyValue } from "@/redux/reducers/surveySlice";
import { setLocations } from "@/redux/reducers/locationSlice";
import MultiSelectDropdown from "@/components/UIComponents/MultiSelectDropdown";

export default function HeroFilterSection() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [date, setDate] = useState<Range>({
    key: "selection"
  });

  const [startedDayIndex, setStartedDayIndex] = useState<number | null>(null)
  const [daysLength, setDaysLength] = useState<number | null>(null)
  const { surveySlice } = useAppSelector((state) => state.surveyReducer);
  const [saveData, setSaveData] = useState(false)
  const [locationSearch, setLocationSearch] = useState<any>({
    location: "",
    occassion: [],
    priority: [],
    person: "",
    dates: "",
    spending:"",
  });

  useEffect(()=>{
    setSaveData(true)
setLocationSearch({...locationSearch,surveySlice})
  },[surveySlice])

  useEffect(() => {
    setLocationSearch({ ...locationSearch, dates: date });

    const calculateDaysRemaining = () => {
      if(date?.endDate && date?.startDate)
      {
        const endDate = new Date(date?.endDate)
        const startDate = new Date(date?.startDate)
        setStartedDayIndex(startDate.getDay())
        
        const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        setDaysLength(daysRemaining+1)
      }
    };

    calculateDaysRemaining();
  }, [date]);

  const handleRoute = () => {
    dispatch(setSurveyValue({...surveySlice,locationSearch}))
    if (locationSearch.dates.startDate) {
      router.push("/trip-plan?address=" + locationSearch.location + "&start_day_index="+startedDayIndex+"&days_length="+daysLength);
    } else {
      router.push("/results?address=" + locationSearch.location);
      dispatch(setSurveyValue(locationSearch))
    }
  };
  return (
    <div
      className={`bg-white p-8 sm:flex block flex-wrap justify-center rounded-xl sm-width gap-y-5`}
    >
      {/* <SelectField
        label="Location"
        placeholder="Select ..."
        data={LocationJson}
        className={`sm:mr-2 sm:my-2 my-5 sm:w-[170px] h-[46px]`}
        styling={{
          shadow: "drop-shadow-xl ",
          left: "0px",
          top: "70px",
        }}
        icon={<SimpleLocation />}
        value={locationSearch.location}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, location: val })
        }
        onAdditionalChange={(_data) => {}}
      /> */}
      <InputField
      className={`sm:mr-2 sm:my-2 my-5 sm:w-[170px] h-[46px]`}
      name="location"
      type="text"
      label="Location"
      placeholder="Enter Location"
      value={locationSearch.location}
      icon={<SimpleLocation />}
      onChange={(e)=>{
        setLocationSearch({...locationSearch, location: e.target.value})
      }}
      />

      <DateRangeField
        label="Travel Date"
        placeholder="Select ..."
        className={`sm:mr-2 sm:my-2 my-7 sm:w-[250px] h-[46px] ${styles.inputWrapper}`}
        value={date}
        onChange={(value) => {
          setDate({...date, startDate: value.startDate, endDate: value.endDate})
        }}
        icon={<CalenderIcon />}
      />

      <MultiSelectDropdown key={1}
        // searchBar
        items={Occasion}
        Label={"Occasion"}
        heightItemsContainer="300px"
        className={"sm:w-[170px]"}
        SelectedData={locationSearch.occassion.length > 0 ? locationSearch.occassion : []}
        saveData={saveData}
        setSaveData={setSaveData}
        placeholder="Select..."
        onChange={(val: any) =>
          setLocationSearch({ ...locationSearch, occassion: val })
        }
      />

      <MultiSelectDropdown key={2}
        // searchBar
        items={Priority}
        Label={"Priority"}
        heightItemsContainer="300px"
        className={"sm:w-[170px]"}
        SelectedData={locationSearch.priority.length > 0 ? locationSearch.priority : []}
        saveData={saveData}
        setSaveData={setSaveData}
        placeholder="Select..."
        onChange={(val: any) =>
          setLocationSearch({ ...locationSearch, priority: val })
        }
      />

      <SelectField
        label="Travelers"
        placeholder="Select ..."
        data={Travelers}
        className={`sm:mr-2 sm:my-2 my-5 sm:w-[170px] h-[46px]`}
        value={locationSearch.person}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, person: val })
        }
        onAdditionalChange={(_data) => {}}
      />

<SelectField
        label="Budget"
        placeholder="Select"
        data={SpendingValue}
        className={`sm:mr-2 sm:my-2 my-5 sm:w-[170px] h-[46px]`}
        value={locationSearch.spending}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, spending: val })
        }
        onAdditionalChange={(_data) => {}}
      />

      <BlueButton
        title={locationSearch.dates.startDate ? "Automate My trip" : "Look For Inspiration"}
        className="sm:w-[200px] w-full"
        onClick={handleRoute}
      />
    </div>
  );
}
