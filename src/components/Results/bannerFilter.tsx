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
    console.log(date,"date")
    setLocationSearch({ ...locationSearch, dates: date });
  }, [date]);

  useEffect(() => {
    const calculateDaysRemaining = () => {
        const currentDate = new Date();
        const endDate = new Date(date.endDate)
        const startDate = new Date(date.startDate)
        console.log(endDate,"endDate",startDate,"startDate")
        const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        console.log(daysRemaining,"daysRemaining")
    };

    calculateDaysRemaining();
}, [date]);

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
      className={`bg-white p-8 sm:flex block flex-wrap justify-center rounded-xl sm-width`}
    >

      <SelectField
        label="Location"
        placeholder="Select ..."
        data={LocationJson}
        className={`mr-2 sm:my-2 my-5 sm:w-[150px] font-semibold ${styles.inputWrapper}`}
        value={locationSearch.location}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, location: val })
        }
        icon={<SimpleLocation />}
        onAdditionalChange={(_data) => {}}
      />

      <DateRangeField
        label="Date"
        className={`mr-2 sm:my-2 my-5 sm:w-[150px] font-semibold ${styles.inputWrapper}`}
        value={date}
        onChange={(value) => setDate(value)}
        icon={<CalenderIcon />}
      />

      <MultiSelectDropdown
        searchBar
        items={Occasion}
        Label={"Occasion"}
        heightItemsContainer="300px"
        className={'sm:w-[150px]'}
        // SelectedData={locationSearch.occassion.length > 0 ? locationSearch.occassion : []}
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
        className={'sm:w-[150px]'}
        // SelectedData={locationSearch.priority.length > 0 ? locationSearch.priority : []}
        placeholder="Select..."
        onChange={(val: any) =>
          setLocationSearch({ ...locationSearch, priority: val })
        }
      />

      <SelectField
        label="Person"
        placeholder="Select ..."
        data={Travelers}
        className={`mr-2 sm:my-2 my-5 sm:w-[150px] font-semibold ${styles.inputWrapper}`}
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
        className={`mr-2 sm:my-2 my-5 sm:w-[150px] font-semibold ${styles.inputWrapper}`}
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
