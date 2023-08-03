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
import { setLocations } from "@/redux/reducers/locationSlice";
import { LocationsCall, ReviewsCall } from "@/api-calls";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import MultiSelectDropdown from "@/components/UIComponents/MultiSelectDropdown";
import LocationJson from '@/data/location.json'
import { setSurveyValue } from "@/redux/reducers/surveySlice";
import { useSearchParams } from 'next/navigation'

export default function HeroFilterSection({ surveyData }: any) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams()
  const paramsAddress = params.get("address")
  const [date, setDate] = useState<any>({
    key: "selection",
  });
  const [typeFetch, setTypeFetch] = useState<any>([]);

  const [locationSearch, setLocationSearch] = useState<any>({
    location: "",
    occassion: [],
    priority: [],
    person: "",
    dates: "",
    spending:"",
  });

  useEffect(() => {
    let data = {
      location: surveyData.location,
      occassion: surveyData.occassion,
      priority: surveyData.priority,
      person: surveyData.person ? surveyData.person : "",
      spending: "",
      dates: "",
    }
    setLocationSearch(
      data
    );
  }, [surveyData]);

  useEffect(() => {
    setLocationSearch({ ...locationSearch, dates: date });
  }, [date]);
    // useEffect(()=>{
    //   setLocationSearch(surveyData)
    //   if(surveyData.location !== ""){
    //     _def()
    //   }
    // },[surveyData])

  const handleRoute = () => {
    if (locationSearch.dates.startDate) {
      router.push("/trip-plan?address=" + locationSearch.location);
    } else {
      router.push("/results?address=" + locationSearch.location);
      dispatch(setSurveyValue(locationSearch))
    }
  };

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

      <SelectField
        label="Location"
        placeholder="Select ..."
        data={LocationJson}
        className={`mr-2 sm:my-2 my-5 sm:w-[200px] ${styles.inputWrapper}`}
        value={locationSearch.location}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, location: val })
        }
        onAdditionalChange={(_data) => {}}
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

      {/* <SelectField
        label="Occassion"
        placeholder="Select ..."
        data={Occasion}
        className={`mr-2 sm:my-2 my-5 sm:w-[200px] ${styles.inputWrapper}`}
        value={locationSearch.occassion}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, occassion: val })
        }
        onAdditionalChange={(_data) => {}}
      /> */}
      <MultiSelectDropdown
        searchBar
        items={Occasion}
        Label={"Occasion"}
        heightItemsContainer="300px"
        // SelectedData={locationSearch.occasion}
        placeholder="Select..."
        onChange={(val: any) =>
          setLocationSearch({ ...locationSearch, occassion: val })
        }
      />

      {/* <SelectField
        label="Priority"
        placeholder="Select ..."
        data={Priority}
        className={`mr-2 sm:my-2 my-5 sm:w-[150px] ${styles.inputWrapper}`}
        value={locationSearch.priority}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, priority: val })
        }
        onAdditionalChange={(_data) => {}}
      /> */}
      <MultiSelectDropdown
        searchBar
        items={Priority}
        Label={"Priority"}
        heightItemsContainer="300px"
        // SelectedData={locationSearch.priority}
        placeholder="Select..."
        onChange={(val: any) =>
          setLocationSearch({ ...locationSearch, priority: val })
        }
      />

      <SelectField
        label="Person"
        placeholder="Select ..."
        data={Travelers}
        className={`mr-2 sm:my-2 my-5 sm:w-[150px] ${styles.inputWrapper}`}
        value={locationSearch.person}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, person: val })
        }
        onAdditionalChange={(_data) => {}}
      />

      <SelectField
        label="Spending"
        placeholder="Select ..."
        data={Travelers}
        className={`mr-2 sm:my-2 my-5 sm:w-[150px] ${styles.inputWrapper}`}
        value={locationSearch.spending}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, spending: val })
        }
        onAdditionalChange={(_data) => {}}
      />

      <BlueButton
        // title="Automate My trip"
        title={locationSearch.dates.startDate ? "Automate My trip" : "Look For Inspiration"}
        className="sm:w-[200px] w-full"
        onClick={handleRoute}
      />
    </div>
  );
}
