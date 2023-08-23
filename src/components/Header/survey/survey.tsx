import { useEffect } from "react";
import BlueButton from "@/components/UIComponents/Buttons/BlueButton";
import PopupWithOverlay from "@/components/UIComponents/Popup/PopupWithOverlay";
import { ISurvey } from "@/interfaces";
import React, { useState } from "react";
import Occasion from "@/data/occasion.json";
import Priorities from "@/data/priority.json";
import LocationJson from "@/data/location.json";
import ContinentLocation from '@/data/continent.json'
import CountryLocation from '@/data/country.json'
import CityLocation from '@/data/city.json'
import AllLocation from '@/data/mixLocation.json'
import SelectField from "@/components/UIComponents/InputField/SelectField";
import { useAppDispatch } from "@/redux/hooks";
import surveySlice, { setSurveyValue } from "@/redux/reducers/surveySlice";
import { useRouter } from "next/navigation";
import { Range } from "react-date-range";
import DateRangeField from "../../UIComponents/InputField/DateRangeField";
import CalenderIcon from "../../icons/Calender";
import styles from "../Header.module.css";
import MultiSelectDropdown from "@/components/Header/survey/MultiSlected";
import RadioInputs from "@/components/UIComponents/RadioInput/RadioInput";

const Survey = ({ show, onClose }: ISurvey) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [survey, setSurvey] = useState<any>({
    location: "",
    selectedOption: "",
    occassion: [],
    priority: [],
    dates: "",
    message: "",
  });

  const [date, setDate] = useState<Range>({
    key: "selection",
  });
  const [dropdownLocationValue,setDropdownLocationValue] = useState<any>([])
  const [locationInputLabel, setLocationInputLabel] = useState("")
  const [questions, setQuestions] = useState<any> ([
    {
      type: "location",
      title: "Do you have any ideas where you want to go?",
      options: [
        {
          label: "Yes, I think I have it sorted by continent",
          value: "continent",
          field: false,
        },
        {
          label: "Yes, I think I have it sorted by country ",
          value: "country",
          field: false,
        },
        { 
          label: "Yes, I think I have it sorted by city ", 
          value: "city",
          field: false,
        },
        { 
          label: "No, but I know where I don’t want to go", 
          value: "no", 
          field: false,
        },
        { 
          label: "I’m open to all suggestions ", 
          value: "all", 
          field: false,
        },
      ],
    },
    {
      title: "Are you celebrating anything special?",
      type: "occasions",
      options: [],
    },
    {
      title: "What sorts of activities would you like prioritized?",
      type: "activities",
      options: [],
    },
    {
      title: "Select Your Trip Dates",
      type: "dates",
      options: [],
    },
    {
      title: "Anything else you’d like us to know?",
      text_box: true,
      options: [],
    },
  ])

  useEffect(() => {
    if(survey.selectedOption == "continent"){
      setLocationInputLabel("Trending Continent")
      setDropdownLocationValue(ContinentLocation)
    }
    if(survey.selectedOption == "country"){
      setLocationInputLabel("Trending Country")
      setDropdownLocationValue(CountryLocation)
    }
    if(survey.selectedOption == "city"){
      setLocationInputLabel("Trending City")
      setDropdownLocationValue(CityLocation)
    }
    if(survey.selectedOption == "no"){
      setLocationInputLabel("Trending Locations")
      setDropdownLocationValue(AllLocation)
    }
    if(survey.selectedOption == "all"){
      setLocationInputLabel("Suggested Locations")
      setDropdownLocationValue(LocationJson)
    }
  }, [survey]);

  const [step, setStep] = useState(1);

  useEffect(() => {
    setSurvey({ ...survey, dates: date });
  }, [date]);

  useEffect(()=>{
    let OptionFiltered = questions
    if(survey.selectedOption !== ""){
      OptionFiltered[step -1].options.map((option:any,index:number)=>{
          if(option.value == survey.selectedOption){
            option.field = true
          }else{
            option.field = false
          }
      })
    }
    setQuestions([...OptionFiltered])
  },[survey])

  useEffect(()=>{
console.log(questions,"questions")
  },[questions])

  const handleSurvey = () => {
    if (survey.dates.startDate || survey.location != "") {
      router.push("/trip-plan?address=" + survey.location);
      onClose();
    } else {
      router.push(`/results?address=${survey.location}`);
      dispatch(setSurveyValue(survey));
      onClose();
      setStep(1);
    }
  };

  const handleChange = () => {};

  return (
    <PopupWithOverlay
      show={show}
      onClose={() => {
        onClose();
      }}
    >
      <h3 className="capitalize text-[33px] leading-[38.84px] font-medium text-center">
        {"Please answer our questions"}
      </h3>
      <p className="text-[16px] leading-[24px] text-center my-2 text-[var(--gray)]">
        We keep track of what cities are on the rise and which ones are falling
        so you can stress less and focus more on living your best vacation life!
      </p>

      <div className="bg-[#FAFDFF] bg-opacity-50 border border-dashed border-[var(--blue)] rounded-xl p-4">
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <span
            className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold cursor-pointer ${
              step > 0
                ? "bg-[var(--blue)] text-white"
                : "bg-[##B3C7D0] text-[#668796]"
            }`}
            onClick={() => {
              setStep(1);
            }}
          >
            01
          </span>
          <span className="flex w-[84px] h-[1px] border-[1.5px] border-[var(--blue)] border-dashed"></span>

          <span
            className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold cursor-pointer ${
              step > 1
                ? "bg-[var(--blue)] text-white"
                : "bg-[##B3C7D0] text-[#668796]"
            }`}
            onClick={() => {
              setStep(2);
            }}
          >
            02
          </span>
          <span className="flex w-[84px] h-[1px] border-[1.5px] border-[var(--blue)] border-dashed"></span>

          <span
            className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold cursor-pointer ${
              step > 2
                ? "bg-[var(--blue)] text-white"
                : "bg-[##B3C7D0] text-[#668796]"
            }`}
            onClick={() => {
              setStep(3);
            }}
          >
            03
          </span>
          <span className="flex w-[84px] h-[1px] border-[1.5px] border-[var(--blue)] border-dashed"></span>

          <span
            className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold cursor-pointer ${
              step > 3
                ? "bg-[var(--blue)] text-white"
                : "bg-[##B3C7D0] text-[#668796]"
            }`}
            onClick={() => {
              setStep(4);
            }}
          >
            04
          </span>
          <span className="flex w-[84px] h-[1px] border-[1.5px] border-[var(--blue)] border-dashed"></span>

          <span
            className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold cursor-pointer ${
              step > 4
                ? "bg-[var(--blue)] text-white"
                : "bg-[##B3C7D0] text-[#668796]"
            }`}
            onClick={() => {
              setStep(5);
            }}
          >
            05
          </span>
        </div>

        <div className="my-10 w-full text-center flex flex-col items-center">
          <p className="">{questions[step - 1]?.title}</p>
          <div className="my-4 pt-3 flex flex-col gap-4 items-start">
            {questions[step - 1]?.type === "location" ? (
              questions[step - 1].options.length > 0 && questions[step - 1].options.map((options:any,index:number)=>{
                return (
                <div className="flex flex-col items-start">
                  <RadioInputs
                  label={{label:options.label, value: options.value}}
                  setValue={setSurvey}
                  value={survey}
                  checked={options.field}
                />
                {options.field == true && (
                  <SelectField
                  label={locationInputLabel}
                  placeholder="Select ..."
                  data={dropdownLocationValue}
                  className={`mr-2 mt-5 mb-2 sm:w-[400px]`}
                  styling={{
                    dropdownHeight: "max-h-[140px]",
                    shadow: "drop-shadow-xl ",
                    left: "0px",
                    top: "70px",
                  }}
                  value={survey.location}
                  onChange={(val) => setSurvey({ ...survey, location: val })}
                  onAdditionalChange={(_data) => {}}
                />
                )}
                </div>
                )
              })
            ):(
              ""
            )}
            {questions[step - 1]?.type === "occasions" && (
              <MultiSelectDropdown
                searchBar
                items={Occasion}
                Label={"Occasion"}
                heightItemsContainer="300px"
                // SelectedData={locationSearch.occasion}
                className={`sm:mr-2 sm:my-2 my-5 sm:w-[400px] w-full h-[70px]`}
                placeholder="Select..."
                onChange={(val: any) =>
                  setSurvey({ ...survey, occassion: val })
                }
              />
            )}
            {questions[step - 1]?.type === "activities" && (
              <MultiSelectDropdown
                searchBar
                disabled
                items={Priorities}
                Label={"Priority"}
                heightItemsContainer="300px"
                className={`sm:mr-2 sm:my-2 my-5 sm:w-[400px] w-full`}
                // SelectedData={locationSearch.occasion}
                placeholder="Select..."
                onChange={(val: any) => setSurvey({ ...survey, priority: val })}
              />
            )}
            {questions[step - 1]?.type === "dates" && (
              <DateRangeField
                label="Date"
                className={`sm:mr-2 sm:my-2 my-5 sm:w-[400px] w-full ${styles.inputWrapper}`}
                value={date}
                onChange={(value) => setDate(value)}
                icon={<CalenderIcon />}
              />
            )}
            {questions[step - 1]?.text_box && (
              <textarea
                className="border border-solid border-[var(--blue)] rounded-xl w-full p-4 outline-none"
                rows={5}
                placeholder="Type here ..."
                value={survey.message}
                onChange={(e) => {
                  setSurvey({ ...survey, message: e.target.value });
                }}
              ></textarea>
            )}
          </div>
          <BlueButton
            type="button"
            className="text-[20px] py-[10px] sm:w-[400px] w-full mt-5"
            title={step < 5 ? "Next" : "Finish"}
            onClick={() => {
              if (step < 5) {
                setStep(step + 1);
              } else {
                handleSurvey();
              }
            }}
          />
        </div>
      </div>
    </PopupWithOverlay>
  );
};

export default Survey;
