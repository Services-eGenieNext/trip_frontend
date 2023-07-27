import React, { useState } from "react";
import InputField from "../UIComponents/InputField/InputField";
import SimpleLocation from "../icons/SimpleLocation";
import CalenderIcon from "../icons/Calender";
import BlueButton from "../UIComponents/Buttons/BlueButton";
import SelectField from "../UIComponents/InputField/SelectField";
import Occasion from "@/data/occasion.json";
import Travelers from "@/data/travelers.json";
import Priority from "@/data/priority.json";
import DateRangeField from "../UIComponents/InputField/DateRangeField";
import styles from "./hero.module.css";
import { Range } from "react-date-range";
import { addDays } from "date-fns";
import { useRouter } from 'next/navigation'

export default function HeroFilterSection() {
  const [date, setDate] = useState<Range>({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: "selection",
  });

  const [locationSearch, setLocationSearch] = useState({
    location: "",
    occassion: "",
    priority: "",
    travelers: "",
  });

  const route = useRouter()

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
        value={locationSearch.priority}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, priority: val })
        }
        onAdditionalChange={(_data) => {}}
      />

      <SelectField
        label="Travelers"
        placeholder="Select ..."
        data={Travelers}
        className={`mr-2 sm:my-2 my-5 sm:w-[150px] ${styles.inputWrapper}`}
        value={locationSearch.travelers}
        onChange={(val) =>
          setLocationSearch({ ...locationSearch, travelers: val })
        }
        onAdditionalChange={(_data) => {}}
      />

      <BlueButton onClick={() => route.push('/results')} title="Automate My trip" className="sm:w-[200px] w-full" />
    </div>
  );
}
