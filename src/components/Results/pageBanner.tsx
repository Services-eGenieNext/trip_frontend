import React, { useState } from "react";
import styles from "./pageBanner.module.css";
import HeroBg from "/public/images/results_page_banner.png";
import Ballon from "/public/images/baloon-transparent.png";
import Image from "next/image";
import InputField from "../UIComponents/InputField/InputField";
import SimpleLocation from "../icons/SimpleLocation";
import CalenderIcon from "../icons/Calender";
import BlueButton from "../UIComponents/Buttons/BlueButton";
import SelectField from "../UIComponents/InputField/SelectField";
import Occasion from "@/data/occasion.json";
import Travelers from "@/data/travelers.json";
import Priority from "@/data/priority.json";
import DateRangeField from "../UIComponents/InputField/DateRangeField";
import { Range } from "react-date-range";
import { addDays } from "date-fns";

const Hero = () => {
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

  const [openAdvanceSearch, setOpenAdvanceSearch] = useState(false);

  return (
    <div className="relative mb-28 mt-10">
      <Image
        src={Ballon}
        alt="Baloon 1"
        className="absolute left-[60px] top-[20%] -z-10 select-none"
      />
      <Image
        src={Ballon}
        alt="Baloon 2"
        className="absolute right-[150px] top-[-25px] -z-10 select-none w-[4%]"
      />
      <Image
        src={Ballon}
        alt="Baloon 3"
        className="absolute left-[150px] top-[-25px] -z-10 select-none w-[3%]"
      />
      <Image
        src={Ballon}
        alt="Baloon 4"
        className="absolute right-[60px] top-[20%] -z-10 select-none"
      />
      <div className="h-full w-full px-4 relative">
        <div className="relative m-auto width">
          <Image
            src={HeroBg}
            alt="Trip-Banner"
            className="mx-auto select-none w-full"
          />
          <div className="absolute bottom-0 left-0 top-0 right-0 px-8 flex flex-wrap justify-center items-center xl:my-[8rem] sm-width">
            <h2 className="leading-10 text-white font-bold text-2xl lg:text-6xl lg:my-5 text-center w-full gilroy">
              Results
            </h2>
            <p className="lg:mt-4 lg:mb-10 text-white text-lg max-w-[700px] text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </p>
          </div>
          <div className="absolute -bottom-14 left-0 flex justify-center w-full">
            <div
              id={styles.filter}
              className={`bg-white p-8 mt-20 flex flex-wrap justify-center rounded-xl sm-width ${
                styles.result_banner
              } ${openAdvanceSearch ? styles.show : ""}`}
            >
              <span
                className="absolute top-2 right-2 block md:hidden"
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
              </span>

              <InputField
                label="Location"
                type="text"
                className={`mr-2 my-2 w-[200px] ${styles.inputWrapper}`}
                value={locationSearch.location}
                onChange={(e) =>
                  setLocationSearch({
                    ...locationSearch,
                    location: e.target.value,
                  })
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
                className={`mr-2 my-2 w-[250px] ${styles.inputWrapper}`}
                value={date}
                onChange={(value) => setDate(value)}
                icon={<CalenderIcon />}
              />

              <SelectField
                label="Occassion"
                placeholder="Select ..."
                data={Occasion}
                className={`mr-2 my-2 w-[200px] ${styles.inputWrapper}`}
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
                className={`mr-2 my-2 w-[150px] ${styles.inputWrapper}`}
                value={locationSearch.priority}
                onChange={(val) =>
                  setLocationSearch({ ...locationSearch, priority: val })
                }
                onAdditionalChange={(_data) => {}}
              />

              <SelectField
                label="Person"
                placeholder="Select ..."
                data={Travelers}
                className={`mr-2 my-2 w-[150px] ${styles.inputWrapper}`}
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
                className={`mr-2 my-2 w-[150px] ${styles.inputWrapper}`}
                value={locationSearch.travelers}
                onChange={(val) =>
                  setLocationSearch({ ...locationSearch, travelers: val })
                }
                onAdditionalChange={(_data) => {}}
              />

              <BlueButton title="Automate My trip" />
            </div>
          </div>
        </div>
      </div>

      <span
        className="md:hidden fixed right-0 flex justify-centera items-center text-white w-[40px] h-[40px] bg-[#009DE2] rounded-l-lg z-10"
        onClick={() => setOpenAdvanceSearch(!openAdvanceSearch)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
      </span>
    </div>
  );
};

export default Hero;
