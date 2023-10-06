import React, { useState, useEffect } from "react";
import InputField from "../UIComponents/InputField/locationInput";
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
import LocationJson from "@/data/location.json";
import { setSurveyValue } from "@/redux/reducers/surveySlice";
import { useSearchParams } from "next/navigation";
import Spending from "@/data/spending.json";
import { useAppSelector } from "@/redux/hooks";
import OccassionsIncrement from "@/api-calls/fromDB/occasionsTrendingIncrement";
import Occassions from "@/api-calls/fromDB/occassions";
import { setOccasions } from "@/redux/reducers/occasionsSlice";
import PrioritiesIncrement from "@/api-calls/fromDB/prioritiesTrendingIncrement";
import Priorities from "@/api-calls/fromDB/priority";
import { setPriorities } from "@/redux/reducers/prioritySlice";
import TopCountries from "@/api-calls/fromDB/topCountries";
import { setTopCountries } from "@/redux/reducers/topCountries";
import { setTopCities } from "@/redux/reducers/topCities";
import LocationIncrement from "@/api-calls/fromDB/topCountriesIncrement";
import AddLocation from "@/api-calls/fromDB/addLocation";
import TopCities from "@/api-calls/fromDB/topCities";
import AddCities from "@/api-calls/fromDB/addCities";
import TopCitiesIncrement from "@/api-calls/fromDB/topCitiesIncrement";
import ContinentLocation from "@/data/continent.json";
import TopCountriesIncrement from "@/api-calls/fromDB/topCountriesIncrement";
import SearchLocation from '@/api-calls/fromDB/searchLocation'
import { setAllLocations } from '@/redux/reducers/allLocations'


export default function HeroFilterSection() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const paramsAddress = params.get("address");
  const [date, setDate] = useState<any>({
    key: "selection",
  });
  const [saveData, setSaveData] = useState(false);
  const [occasions, setOccasionsArray] = useState<any>([]);
  const [invalidLocation,setInvalidLocation] = useState(false)
  const [locationRequired,setLocationRequired] = useState(false)
  const [topCountriesValue, setTopCountriesValue] = useState<any>([]);
  const [topCitiesValue, setTopCitiesValue] = useState<any>([]);
  const [allLocation, setAllLocation] = useState<any>([]);
  const [locationDropdownValue, setLocationDropdownValue] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [buttonText, setButtonText] = useState("Look For Inspiration");
const { allLocationsState } = useAppSelector((state) => state.allLocationSlice);
  const { ocassionsState } = useAppSelector((state) => state.occasionsSlice);
  const { priorityState } = useAppSelector((state) => state.prioritySlice);
  const { surveySlice } = useAppSelector((state) => state.surveyReducer);
  const { topCountriesState } = useAppSelector(
    (state) => state.topCountriesSlice
  );
  const { topCitiesState } = useAppSelector((state) => state.topCitiesSlice);
  const [locationSearch, setLocationSearch] = useState<any>({
    location: "",
    occassion: [],
    priority: [],
    person: "",
    dates: "",
    spending: "",
  });
  const [prioritiesValue, setPrioritiesValue] = useState<any>([]);
  const [startedDayIndex, setStartedDayIndex] = useState<number | null>(null)
  const [daysLength, setDaysLength] = useState<number | null>(null)

  // useEffect(() => {
  //   setLocationSearch({ ...locationSearch, location: paramsAddress });
  // }, [paramsAddress]);

  useEffect(() => {
    if (ocassionsState?.length > 0) {
      setOccasionsArray(ocassionsState);
    } else {
      setOccasionsArray([]);
    }
  }, [ocassionsState]);

  useEffect(() => {
    if (topCitiesState?.length > 0) {
      setTopCitiesValue(topCitiesState);
    } else {
      setTopCitiesValue([]);
    }
  }, [topCitiesState]);

  useEffect(() => {
    if (priorityState?.length > 0) {
      setPrioritiesValue(priorityState);
    } else {
      setPrioritiesValue([]);
    }
  }, [priorityState]);

  useEffect(()=>{
    if(allLocationsState.length > 0){
      setAllLocation(allLocationsState)
    }else(
      setAllLocation([])
    )
      },[allLocationsState])

  // useEffect(() => {
  //   if (topCountriesState?.length > 0) {
  //     setTopCountriesValue(topCountriesState);
  //   } else {
  //     setTopCountriesValue([]);
  //   }
  // }, [topCountriesState]);

  // useEffect(() => {
  //   if (topCitiesValue.length > 0) {
  //     const newArray: any = topCitiesValue?.map((opt: any) => ({
  //       ...opt,
  //       type: "city",
  //     }));
  //     setLocationDropdownValue(newArray);
  //   } else {
  //     if (topCountriesValue.length > 0) {
  //       const newArray: any = topCountriesValue?.map((opt: any) => ({
  //         ...opt,
  //         type: "country",
  //       }));
  //       setLocationDropdownValue(newArray);
  //     } else {
  //       const newArray: any = ContinentLocation?.map((opt: any) => ({
  //         ...opt,
  //         type: "continent",
  //       }));
  //       setLocationDropdownValue(newArray);
  //     }
  //   }
  // }, [topCitiesValue, topCountriesValue]);

  useEffect(() => {
    console.log(surveySlice,"surveySlice 123")
    let data = {
      location: surveySlice.location ? surveySlice.location : "",
      occassion: surveySlice.occassion && surveySlice.occassion.length > 0
            ? surveySlice.occassion
            : [],
      priority:
                surveySlice.priority && surveySlice.priority.length > 0
                  ? surveySlice.priority
                  : [],
      person: surveySlice.person ? surveySlice.person : "",
      spending: surveySlice.spending ? surveySlice.spending : "",
      dates: surveySlice.dates ? surveySlice.dates :"",
    }
    setSaveData(true);
    setDate(surveySlice.dates)
    setLocationSearch(data)
    // ...locationSearch,location: surveySlice.location,
    //   occassion:
    //     surveySlice.occassion && surveySlice.occassion.length > 0
    //       ? surveySlice.occassion
    //       : [],
    //   priority:
    //     surveySlice.priority && surveySlice.priority.length > 0
    //       ? surveySlice.priority
    //       : [],
    //   person: surveySlice.person ? surveySlice.person : "",
    //   spending: surveySlice.spending ? surveySlice.spending : "",
    //   dates: surveySlice.dates,
  }, [surveySlice]);

  useEffect(() => {
    // setLocationSearch({ ...locationSearch, dates: date });

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

  const _get_url = async () => {
    let url = locationSearch.location ? locationSearch.location : ""

    let occassion_arr = await locationSearch.occassion.map((oc: any) => oc.opt)
    let priority_arr = await locationSearch.priority.map((pr: any) => pr.opt)
    let arr = occassion_arr.concat(...priority_arr)
    console.log('arr', arr, occassion_arr, priority_arr)

    url = (url.trim() != "" && arr.length > 0) ? `${arr.join(',')} in ${url}` : url

    return url
  }

  const ValidateData = async () => {
    const filteredCity = allLocation.filter((country: any) => {
      return (
        country?.city?.toLocaleLowerCase() ==
        selectedLocation.toLocaleLowerCase()
      );
    });
    if (locationSearch.occassion.length > 0) {
      for (var i = 0; i < locationSearch.occassion.length; i++) {
        let res = await OccassionsIncrement(locationSearch.occassion[i].id);
        if (res) {
          let updatedOccasionsList = await Occassions();
          dispatch(setOccasions(updatedOccasionsList));
        }
      }
    }
    if (locationSearch.priority.length > 0) {
      for (var i = 0; i < locationSearch.priority.length; i++) {
        let res = await PrioritiesIncrement(locationSearch.priority[i].id);
        if (res) {
          let updatedOccasionsList = await Priorities();
          dispatch(setPriorities(updatedOccasionsList));
        }
      }
    }
    let _url = await _get_url()
    if (buttonText == "Automate My trip") {
      router.push("/trip-plan?address=" + _url + "&start_day_index="+startedDayIndex+"&days_length="+daysLength);
    } else {
      router.push("/results?address=" + _url);
      dispatch(setSurveyValue(locationSearch));
    }
  };

  const handleRoute = async () => {
    dispatch(setSurveyValue(locationSearch));
    if (locationSearch.location == "") {
      setLocationRequired(true);
    } else {
      ValidateData();
      // const filteredCity = topCitiesValue.filter((country: any) => {
      //   return (
      //     country?.name?.toLocaleLowerCase() ==
      //     selectedLocation.toLocaleLowerCase()
      //   );
      // });

      // const filteredCountry = topCountriesValue.filter((country: any) => {
      //   return (
      //     country?.name?.toLocaleLowerCase() ==
      //     selectedLocation.toLocaleLowerCase()
      //   );
      // });

      // const filteredContinent = ContinentLocation.filter((country: any) => {
      //   return (
      //     country?.name?.toLocaleLowerCase() ==
      //     selectedLocation.toLocaleLowerCase()
      //   );
      // });

      // if (
      //   filteredCity.length > 0 ||
      //   filteredCountry.length > 0 ||
      //   filteredContinent.length > 0
      // ) {
      //   if (filteredCity.length > 0) {
      //       let res = await TopCitiesIncrement(filteredCity[0].id);
      //       if (res) {
      //         let updatedOccasionsList = await TopCities();
      //         dispatch(setTopCities(updatedOccasionsList));
      //         ValidateData();
      //       }
      //   }
      //   if (filteredCountry.length > 0) {
      //       let res = await TopCountriesIncrement(filteredCountry[0].id);
      //       if (res) {
      //         let updatedOccasionsList = await TopCountries();
      //         dispatch(setTopCountries(updatedOccasionsList));
      //         ValidateData();
      //       }
      //   }
      //   if (filteredContinent.length > 0) {
      //     ValidateData();
      //   }
      // } else {
      //     let res = await AddCities(selectedLocation);
      //     if (res) {
      //       let updatedOccasionsList = await TopCities();
      //       dispatch(setTopCities(updatedOccasionsList));
      //       ValidateData();
      //   }else{
      //       let res = await AddLocation(selectedLocation);
      //       if (res) {
      //         let updatedOccasionsList = await TopCountries();
      //         dispatch(setTopCountries(updatedOccasionsList));
      //         ValidateData();
      //     }else{
      //       if (filteredContinent.length > 0) {
      //         ValidateData();
      //       }else{
      //         setInvalidLocation(true);
      //       }
      //     }
      //   }
      // }
    }
  };

   const _SearchLocation = async () => {
                                let res = await SearchLocation(locationSearch.location)
                                dispatch(setAllLocations(res))
                            }

  useEffect(() => {

    const filteredLocation =  allLocation.filter((country: any) => {
      return (
        country?.city?.toLocaleLowerCase() ==
        locationSearch.location.toLocaleLowerCase()
      );
    });

    if (filteredLocation.length > 0) {
      setButtonText("Automate My trip");
    } else {
      _SearchLocation()

    }
  }, [selectedLocation,locationSearch]);

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
      <div className={`sm:mr-2 sm:my-2 my-5 sm:w-[170px]`}>
      <InputField
          className={`sm:w-[170px] h-[46px]`}
          name="location"
          type="text"
          label="Location"
          placeholder="Enter Location"
          locationList={{
            city: topCitiesValue,
            country: topCountriesValue,
            continent: ContinentLocation,
          }}
          value={locationSearch?.location}
          items={allLocation}
          icon={<SimpleLocation />}
          onChange={(val: any) => {
            setSelectedLocation(val);
            setLocationSearch({ ...locationSearch, location: val });
          }}
          onFocus={() => {
            setInvalidLocation(false);
            setLocationRequired(false);
          }}
        />
        {invalidLocation == true && (
      <p className="text-[red] text-[14px] mt-3">Invalid Location.</p>
      )}
      {locationRequired == true && (
        <p className="text-[red] text-[14px] mt-3">Location Required.</p>
      )}
      </div>

      <DateRangeField
        label="Travel Date"
        placeholder="Select ..."
        className={`sm:mr-2 sm:my-2 my-7 sm:w-[250px] h-[46px] ${styles.inputWrapper}`}
        value={date}
        onChange={(value) => {
          setDate({...date, startDate: value.startDate, endDate: value.endDate})
          setLocationSearch({...locationSearch,dates: {startDate: value.startDate, endDate: value.endDate}})
        }}
        icon={<CalenderIcon />}
      />

      <MultiSelectDropdown
        // searchBar
        items={occasions}
        Label={"Occasion"}
        heightItemsContainer="300px"
        className={"sm:w-[150px]"}
        SelectedData={
          locationSearch?.occassion?.length > 0 ? locationSearch.occassion : []
        }
        placeholder="Enter Occasion"
        saveData={saveData}
        setSaveData={setSaveData}
        onChange={(val: any) =>
          setLocationSearch({ ...locationSearch, occassion: val })
        }
        dropdownWidth = "sm:w-[300px]"
      />

      <MultiSelectDropdown
        // searchBar
        items={prioritiesValue}
        Label={"Priority"}
        allowSorting={true}
        heightItemsContainer="300px"
        className={"sm:w-[150px]"}
        SelectedData={
          locationSearch?.priority?.length > 0 ? locationSearch.priority : []
        }
        saveData={saveData}
        setSaveData={setSaveData}
        placeholder="Enter Priority"
        onChange={(val: any) =>
          setLocationSearch({ ...locationSearch, priority: val })
        }
        dropdownWidth = "sm:w-[300px]"
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
        title={buttonText}
        className="sm:w-[200px] w-full h-[56px]"
        onClick={handleRoute}
      />
    </div>
  );
}
