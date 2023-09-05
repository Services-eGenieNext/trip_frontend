import React, { useState, useEffect } from "react";
import InputField from "../UIComponents/InputField/inputWithSuggestions";
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
import OccassionsIncrement from "@/api-calls/fromDB/occasionsTrendingIncrement";
import PrioritiesIncrement from "@/api-calls/fromDB/prioritiesTrendingIncrement";
import LocationIncrement from "@/api-calls/fromDB/topCountriesIncrement";
import Occassions from '@/api-calls/fromDB/occassions'
import { setOccasions } from '@/redux/reducers/occasionsSlice'
import Priorities from '@/api-calls/fromDB/priority'
import { setPriorities } from '@/redux/reducers/prioritySlice'
import TopCountries from '@/api-calls/fromDB/topCountries'
import { setTopCountries } from '@/redux/reducers/topCountries'
import AddLocation from "@/api-calls/fromDB/addLocation";

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
  const { ocassionsState } = useAppSelector((state) => state.occasionsSlice);
  const { priorityState } = useAppSelector((state) => state.prioritySlice);
  const { topCountriesState } = useAppSelector((state) => state.topCountriesSlice);
  const [occasions,setOccasionsArray] = useState<any>([])
  const [prioritiesValue, setPrioritiesValue] = useState<any>([])
  const [topCountriesValue, setTopCountriesValue] = useState<any>([])
  const [locationSearch, setLocationSearch] = useState<any>({
    location: "",
    occassion: [],
    priority: [],
    person: "",
    dates: "",
    spending:"",
  });

  useEffect(()=>{
if(ocassionsState?.length > 0){
  setOccasionsArray(ocassionsState)
}else{
  setOccasionsArray([])
}
  },[ocassionsState])

  useEffect(()=>{
if(priorityState?.length > 0){
  setPrioritiesValue(priorityState)
}else{
  setPrioritiesValue([])
}
  },[priorityState])

  useEffect(()=>{
    if(topCountriesState?.length > 0){
      setTopCountriesValue(topCountriesState)
    }else{
      setTopCountriesValue([])
    }
  },[topCountriesState])

  useEffect(() => {
    let data = {
      location: surveySlice.location,
      occassion: surveySlice.occassion && surveySlice.occassion.length > 0 ? surveySlice.occassion : [],
      priority: surveySlice.priority && surveySlice.priority.length > 0 ? surveySlice.priority : [],
      person: surveySlice.person ? surveySlice.person : "",
      spending: surveySlice.spending ? surveySlice.spending : "",
      dates: "",
    }
    setSaveData(true)
    setLocationSearch(
      data
    );
  }, [surveySlice]);

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

  const handleRoute = async () => {
    dispatch(setSurveyValue(locationSearch))
    if(locationSearch.occassion.length > 0){
      for(var i = 0; i < locationSearch.occassion.length; i++){
        let res = await OccassionsIncrement(locationSearch.occassion[i].id)
        if(res){
          let updatedOccasionsList = await Occassions()
          dispatch(setOccasions(updatedOccasionsList))
        }
      }
    }
    if(locationSearch.priority.length > 0){
      for(var i = 0; i < locationSearch.priority.length; i++){
        let res = await PrioritiesIncrement(locationSearch.priority[i].id)
        if(res){
          let updatedOccasionsList = await Priorities()
          dispatch(setPriorities(updatedOccasionsList))
        }
      }
    }
    if(locationSearch.location != ""){
      const filtered = topCountriesValue?.filter((country:any) => {
        return country?.name?.toLocaleLowerCase() == locationSearch.location.toLocaleLowerCase();
      });
      if(filtered.length > 0){
        for(var i = 0; i < filtered.length; i++){
          console.log(filtered[i].id)
          let res = await LocationIncrement(filtered[i].id)
          if(res){
            let updatedOccasionsList = await TopCountries()
            dispatch(setTopCountries(updatedOccasionsList))
          }
        }
      }else{
        let res = await AddLocation(locationSearch.location)
        if(res){
          let updatedOccasionsList = await TopCountries()
            dispatch(setTopCountries(updatedOccasionsList))
        }
      }
    }
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
      value={locationSearch?.location?.country}
      items={topCountriesValue}
      icon={<SimpleLocation />}
      onChange={(val:any)=>{
        setLocationSearch({...locationSearch, location: val})
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
        items={occasions}
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
        items={prioritiesValue}
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
