import React, { useState, useEffect } from "react";
import InputField from "../UIComponents/InputField/inputWithSuggestions";
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
import Spending from '@/data/spending.json'
import {useAppSelector} from '@/redux/hooks'
import OccassionsIncrement from "@/api-calls/fromDB/occasionsTrendingIncrement";
import Occassions from '@/api-calls/fromDB/occassions'
import { setOccasions } from '@/redux/reducers/occasionsSlice'
import PrioritiesIncrement from "@/api-calls/fromDB/prioritiesTrendingIncrement";
import Priorities from '@/api-calls/fromDB/priority'
import { setPriorities } from '@/redux/reducers/prioritySlice'
import TopCountries from '@/api-calls/fromDB/topCountries'
import { setTopCountries } from '@/redux/reducers/topCountries'
import LocationIncrement from "@/api-calls/fromDB/topCountriesIncrement";
import AddLocation from "@/api-calls/fromDB/addLocation";
import TopCities from '@/api-calls/fromDB/topCities'
import AddCities from "@/api-calls/fromDB/addCities";
import TopCitiesIncrement from "@/api-calls/fromDB/topCitiesIncrement";


export default function HeroFilterSection({ surveyData }: any) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams()
  const paramsAddress = params.get("address")
  const [date, setDate] = useState<any>({
    key: "selection",
  });
  const [saveData, setSaveData] = useState(false)
  const [occasions,setOccasionsArray] = useState<any>([])
  const [topCountriesValue, setTopCountriesValue] = useState<any>([])
   const { ocassionsState } = useAppSelector((state) => state.occasionsSlice);
   const { priorityState } = useAppSelector((state) => state.prioritySlice);
   const { topCountriesState } = useAppSelector((state) => state.topCountriesSlice);

  const [locationSearch, setLocationSearch] = useState<any>({
    location: "",
    occassion: [],
    priority: [],
    person: "",
    dates: "",
    spending:"",
  });
  const [prioritiesValue, setPrioritiesValue] = useState<any>([])

  useEffect(()=>{
setLocationSearch({...locationSearch,location: paramsAddress})
  },[paramsAddress])

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
      location: surveyData.location,
      occassion: surveyData.occassion && surveyData.occassion.length > 0 ? surveyData.occassion : [],
      priority: surveyData.priority && surveyData.priority.length > 0 ? surveyData.priority : [],
      person: surveyData.person ? surveyData.person : "",
      spending: surveyData.spending ? surveyData.spending : "",
      dates: "",
    }
    setSaveData(true)
    setLocationSearch(
      data
    );
  }, [surveyData]);

  useEffect(() => {
    setLocationSearch({ ...locationSearch, dates: date });
  }, [date]);

  useEffect(() => {
    const calculateDaysRemaining = () => {
        const currentDate = new Date();
        const endDate = new Date(date.endDate)
        const startDate = new Date(date.startDate)
        const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
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
        return country?.name?.toLocaleLowerCase() == locationSearch?.location?.toLocaleLowerCase();
      });
      if(filtered.length > 0){
        for(var i = 0; i < filtered.length; i++){
          console.log(filtered[i].id)
          let res = await TopCitiesIncrement(filtered[i].id)
          if(res){
            let updatedOccasionsList = await TopCities()
            dispatch(setTopCountries(updatedOccasionsList))
          }
        }
      }else{
        let res = await AddCities(locationSearch.location)
        if(res){
          let updatedOccasionsList = await TopCities()
            dispatch(setTopCountries(updatedOccasionsList))
        }
      }
    }
    if (locationSearch.dates.startDate) {
      router.push("/trip-plan?address=" + locationSearch.location);
    } else {
      router.push("/results?address=" + locationSearch.location);
    }
  };

  const [openAdvanceSearch, setOpenAdvanceSearch] = useState(false);

  return (
    <div
      className={`bg-white p-8 sm:flex block flex-wrap justify-center rounded-xl sm-width`}
    >

      {/* <SelectField
        label="Location"
        placeholder="Select ..."
        data={LocationJson}
        className={`mr-2 sm:my-2 my-5 sm:w-[150px] ${styles.inputWrapper}`}
        value={locationSearch.location}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, location: val })
        }
        icon={<SimpleLocation />}
        onAdditionalChange={(_data) => {}}
      /> */}

<InputField
      className={`sm:mr-2 sm:my-2 my-5 sm:w-[170px] h-[46px]`}
      name="location"
      type="text"
      label="Location"
      placeholder="Enter Location"
      value={locationSearch?.location}
      items={topCountriesValue}
      icon={<SimpleLocation />}
      onChange={(val:any)=>{
        setLocationSearch({...locationSearch, location: val})
      }}
      />

      <DateRangeField
        label="Travel Date"
        className={`mr-2 sm:my-2 my-5 sm:w-[250px] ${styles.inputWrapper}`}
        value={date}
        onChange={(value) => setDate(value)}
        icon={<CalenderIcon />}
      />

      <MultiSelectDropdown
        // searchBar
        items={occasions}
        Label={"Occasion"}
        heightItemsContainer="300px"
        className={'sm:w-[150px]'}
        SelectedData={locationSearch?.occassion?.length > 0 ? locationSearch.occassion : []}
        placeholder="Enter Occasion"
        saveData={saveData}
        setSaveData={setSaveData}
        onChange={(val: any) =>
          setLocationSearch({ ...locationSearch, occassion: val })
        }
      />

      <MultiSelectDropdown
        // searchBar
        items={prioritiesValue}
        Label={"Priority"}
         allowSorting={true}
        heightItemsContainer="300px"
        className={'sm:w-[150px]'}
        SelectedData={locationSearch?.priority?.length > 0 ? locationSearch.priority : []}
        saveData={saveData}
        setSaveData={setSaveData}
        placeholder="Enter Priority"
        onChange={(val: any) =>
          setLocationSearch({ ...locationSearch, priority: val })
        }
      />

      <SelectField
        label="Travelers"
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
        label="Budget"
        placeholder="Select ..."
        data={Spending}
        className={`mr-2 sm:my-2 my-5 sm:w-[150px] ${styles.inputWrapper}`}
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
