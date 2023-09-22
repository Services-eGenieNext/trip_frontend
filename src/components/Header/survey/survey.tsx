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
import InputField from "@/components/UIComponents/InputField/inputWithSuggestions";
import { useAppDispatch,useAppSelector } from "@/redux/hooks";
import surveySlice, { setSurveyValue } from "@/redux/reducers/surveySlice";
import { useRouter } from "next/navigation";
import { Range } from "react-date-range";
import DateRangeField from "../../UIComponents/InputField/DateRangeField";
import CalenderIcon from "../../icons/Calender";
import styles from "../Header.module.css";
import MultiSelectDropdown from "@/components/UIComponents/MultiSelectDropdown";
import RadioInputs from "@/components/UIComponents/RadioInput/RadioInput";
import SimpleLocation from "../../icons/SimpleLocation";
import Tooltip from '@mui/material/Tooltip';
import Occassions from '@/api-calls/fromDB/occassions'
import { setOccasions } from '@/redux/reducers/occasionsSlice'
import OccassionsIncrement from "@/api-calls/fromDB/occasionsTrendingIncrement";
import PriorityValue from '@/api-calls/fromDB/priority'
import { setPriorities } from '@/redux/reducers/prioritySlice'
import PrioritiesIncrement from "@/api-calls/fromDB/prioritiesTrendingIncrement";
import TopCountries from '@/api-calls/fromDB/topCountries'
import TopCities from '@/api-calls/fromDB/topCities'
import { setTopCountries } from '@/redux/reducers/topCountries'
import AddLocation from "@/api-calls/fromDB/addLocation";
import LocationIncrement from "@/api-calls/fromDB/topCountriesIncrement";
import AddCities from "@/api-calls/fromDB/addCities";
import TopCitiesIncrement from "@/api-calls/fromDB/topCitiesIncrement";

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
  const { ocassionsState } = useAppSelector((state) => state.occasionsSlice);
  const { priorityState } = useAppSelector((state) => state.prioritySlice);
  // const { topCountriesState } = useAppSelector((state) => state.topCountriesSlice);
  const [occasions,setOccasionsArray] = useState<any>([])
  const [prioritiesValue, setPrioritiesValue] = useState<any>([])
  const [topCountriesValue, setTopCountriesValue] = useState<any>([])
  const [topCities, setTopCities] = useState<any>([])

  const [date, setDate] = useState<Range>({
    key: "selection",
  });
  const [dropdownLocationValue,setDropdownLocationValue] = useState<any>([])
  const [locationInputLabel, setLocationInputLabel] = useState("")
  const [saveData, setSaveData] = useState(false)
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


  const _Occassions = async () => {
    let res = await Occassions()
    dispatch(setOccasions(res))
}

const _Priorities = async () => {
  let res = await PriorityValue()
  dispatch(setPriorities(res))
}

const _TopCountries = async () => {
  let res = await TopCountries()
  // dispatch(setTopCountries(res))
  setTopCountriesValue(res)
}

const _TopCities = async () => {
  let res = await TopCities()
  if(res?.length > 0){
    setTopCities(res)
  }else{
    setTopCities([])
  }
}

  useEffect(()=>{
    _Occassions()
    _Priorities()
    _TopCountries()
    _TopCities()
  },[])

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
    
          // useEffect(()=>{
          //   if(topCountriesState?.length > 0){
          //     setTopCountriesValue(topCountriesState)
          //   }else{
          //     setTopCountriesValue([])
          //   }
          // },[topCountriesState])

  useEffect(() => {
    if(survey.selectedOption == "continent"){
      setLocationInputLabel("Continent")
      setDropdownLocationValue(ContinentLocation)
    }
    if(survey.selectedOption == "country"){
      setLocationInputLabel("Country")
      setDropdownLocationValue(topCountriesValue)
    }
    if(survey.selectedOption == "city"){
      setLocationInputLabel("City")
      setDropdownLocationValue(topCities)
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

  useEffect(()=>{
setSurvey({...survey, location:"" })
  },[survey.selectedOption])

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

  const handleSurvey = async () => {
    dispatch(setSurveyValue(survey));
    if(survey.occassion.length > 0){
      for(var i = 0; i < survey.occassion.length; i++){
        let res = await OccassionsIncrement(survey.occassion[i].id)
        if(res){
          _Occassions()
        }
      }
    }
    if(survey.priority.length > 0){
      for(var i = 0; i < survey.priority.length; i++){
        let res = await PrioritiesIncrement(survey.priority[i].id)
        if(res){
          _Priorities()
        }
      }
    }
    if(survey.location != ""){
      const filtered = dropdownLocationValue?.filter((country:any) => {
        return country?.name?.toLocaleLowerCase() == survey.location.toLocaleLowerCase();
      });
      if(filtered.length > 0){
        for(var i = 0; i < filtered.length; i++){
          if(survey.selectedOption == "country"){
            let res = await LocationIncrement(filtered[i].id)
            if(res){
              let updatedOccasionsList = await TopCountries()
              dispatch(setTopCountries(updatedOccasionsList))
            }
          }
          if(survey.selectedOption == "city"){
            let res = await TopCitiesIncrement(filtered[i].id)
            if(res){
              _TopCities()
            }
          }
        }
      }else{
        if(survey.selectedOption == "country"){
          let res = await AddLocation(survey.location)
          if(res){
            let updatedOccasionsList = await TopCountries()
              dispatch(setTopCountries(updatedOccasionsList))
          }
          if(survey.selectedOption == "city"){
            let res = await AddCities(survey.location)
            if(res){
              _TopCities()
            }
          }
        }
      }
    }
    if (survey.dates.startDate) {
      router.push("/trip-plan?address=" + survey.location);
      onClose();
    } else {
      router.push(`/results?address=${survey.location}`);
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
          <Tooltip title="Go to step 1">
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
          </Tooltip>
          <span className="flex w-[84px] h-[1px] border-[1.5px] border-[var(--blue)] border-dashed"></span>
            <Tooltip title="Go to step 2">
          <span
            className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold cursor-pointer ${
              step > 1
                ? "bg-[var(--blue)] text-white"
                : "bg-[##B3C7D0] text-[#668796]"
            }`}
            onClick={() => {
              setStep(2);
              setSaveData(true)
            }}
          >
            02
          </span>
            </Tooltip>
          <span className="flex w-[84px] h-[1px] border-[1.5px] border-[var(--blue)] border-dashed"></span>
          <Tooltip title="Go to step 3">
          <span
            className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold cursor-pointer ${
              step > 2
                ? "bg-[var(--blue)] text-white"
                : "bg-[##B3C7D0] text-[#668796]"
            }`}
            onClick={() => {
              setStep(3);
              setSaveData(true)
            }}
          >
            03
          </span>
          </Tooltip>
          <span className="flex w-[84px] h-[1px] border-[1.5px] border-[var(--blue)] border-dashed"></span>
          <Tooltip title="Go to step 4">
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
          </Tooltip>
          <span className="flex w-[84px] h-[1px] border-[1.5px] border-[var(--blue)] border-dashed"></span>
          <Tooltip title="Go to step 5">
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
          </Tooltip>
        </div>

        <div className="my-10 w-full text-center flex flex-col items-center">
          <p className="">{questions[step - 1]?.title}</p>
          <div className="my-4 pt-3 flex flex-col gap-4 items-start sm:w-auto w-full sm:px-0 px-5">
           {/* <SelectField
                  label={locationInputLabel}
                  placeholder="Select ..."
                  data={dropdownLocationValue}
                  className={`mr-2 mt-5 mb-2 sm:w-[400px] w-full`}
                  styling={{
                      dropdownHeight: "max-h-[140px]",
                      shadow: "drop-shadow-xl ",
                      left: "0px",
                      top: "70px",
                    }}
                    value={survey.location}
                    onChange={(val) => setSurvey({ ...survey, location: val })}
                    onAdditionalChange={(_data) => {}}
                  /> */}
            {questions[step - 1]?.type === "location" ? (
              questions[step - 1].options.length > 0 && questions[step - 1].options.map((options:any,index:number)=>{
                return (
                <div key={index} className="flex flex-col items-start">
                  <RadioInputs
                  label={{label:options.label, value: options.value}}
                  setValue={setSurvey}
                  value={survey}
                  checked={options.field}
                />
                {options.field == true && (
                  <InputField
      className={`sm:mr-2 sm:my-2 my-5 w-full h-[46px]`}
      name="location"
      type="text"
      label={locationInputLabel}
      placeholder={`Enter ${locationInputLabel}`}
      value={survey?.location}
      items={dropdownLocationValue}
      icon={<SimpleLocation />}
      onChange={(val:any)=>{
        setSurvey({...survey, location: val})
      }}
      onFocus = {()=>{
        console.log("")
        // setInvalidLocation(false)
        // setLocationRequired(false)
      }}
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
                // searchBar
                items={occasions}
                saveData={saveData}
                setSaveData={setSaveData}
                Label={"Occasion"}
                heightItemsContainer="300px"
                SelectedData={survey.occassion}
                className={`sm:mr-2 sm:my-2 my-5 sm:w-[400px] w-full`}
                placeholder="Select..."
                onChange={(val: any) =>
                  setSurvey({ ...survey, occassion: val })
                }
                dropdownWidth = "sm:w-[400px]"
              />
            )}
            {questions[step - 1]?.type === "activities" && (
              <MultiSelectDropdown
                // searchBar
                disabled
                 allowSorting={true}
                saveData={saveData}
                setSaveData={setSaveData}
                items={prioritiesValue}
                Label={"Priority"}
                heightItemsContainer="300px"
                className={`sm:mr-2 sm:my-2 my-5 sm:w-[400px] w-full`}
                SelectedData={survey.priority}
                placeholder="Select..."
                onChange={(val: any) => setSurvey({ ...survey, priority: val })}
                dropdownWidth = "sm:w-[400px]"
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
                className="border border-solid border-[var(--blue)] rounded-xl sm:w-[400px] w-full p-4 outline-none"
                rows={5}
                placeholder="Type here ..."
                value={survey.message}
                onChange={(e) => {
                  setSurvey({ ...survey, message: e.target.value });
                }}
              ></textarea>
            )}
          </div>
          <div className="flex items-center gap-x-2">
                <button
                  type="button"
                  className="rounded-xl text-[#009DE2] border border-[#009DE2] py-[14px] sm:w-[200px] w-full hover:bg-[#009DE2] hover:text-white bg-transparent mt-5 my-2"
                  onClick={()=>{
                    onClose()
                  }}
                >Exit</button>
          <BlueButton
            type="button"
            className="text-[20px] py-[10px] sm:w-[200px] w-full mt-5"
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
      </div>
    </PopupWithOverlay>
  );
};

export default Survey;
