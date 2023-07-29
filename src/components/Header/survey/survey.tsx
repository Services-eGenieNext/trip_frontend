import { useEffect } from "react";
import BlueButton from "@/components/UIComponents/Buttons/BlueButton";
import PopupWithOverlay from "@/components/UIComponents/Popup/PopupWithOverlay";
import { ISurvey } from "@/interfaces";
import React, { useState } from "react";
import Occasions from "@/data/occasion.json";
import Priorities from "@/data/priority.json";
import InputField from "@/components/UIComponents/InputField/InputField";
import SimpleLocation from "../../icons/SimpleLocation";
import SelectField from "@/components/UIComponents/InputField/SelectField";
import { LocationsCall, DetailCall } from "@/api-calls";

const Survey = ({ show, onClose }: ISurvey) => {
  const [survey, setSurvey] = useState<any>({
    location: "",
    occassion: "",
    activities: "",
    cuisines: "",
    message: "",
  });

  const [locations,setLocations] = useState([])

  const [step, setStep] = useState(1);

  const questions = [
    {
      title: "Do you have any ideas where you want to go?",
      options: "location",
    },
    {
      title: "Are you celebrating anything special?",
      occasions: true,
    },
    {
      title: "What sorts of activities would you like prioritized?",
      options: "activities",
    },
    {
      title: "Rank your favorite cuisines",
      options: "cuisines",
    },
    {
      title: "Anything else you’d like us to know?",
      text_box: true,
    },
  ];

  useEffect(() => {
    if (survey.location !== "") {
      const activities = async () => {
        let res = await LocationsCall(survey.location);
        console.log("survey locations", res);
        setLocations(res)
      };
      activities();
    }
  }, [survey]);

  const fetchingCuisines = (location_id:string) => {
    const details = async () => {
        let res = await DetailCall(location_id)
        console.log('object', res)
    }
    details()
  }

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
            className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold ${
              step > 0
                ? "bg-[var(--blue)] text-white"
                : "bg-[##B3C7D0] text-[#668796]"
            }`}
          >
            01
          </span>
          <span className="flex w-[84px] h-[1px] border-[1.5px] border-[var(--blue)] border-dashed"></span>

          <span
            className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold ${
              step > 1
                ? "bg-[var(--blue)] text-white"
                : "bg-[##B3C7D0] text-[#668796]"
            }`}
          >
            02
          </span>
          <span className="flex w-[84px] h-[1px] border-[1.5px] border-[var(--blue)] border-dashed"></span>

          <span
            className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold ${
              step > 2
                ? "bg-[var(--blue)] text-white"
                : "bg-[##B3C7D0] text-[#668796]"
            }`}
          >
            03
          </span>
          <span className="flex w-[84px] h-[1px] border-[1.5px] border-[var(--blue)] border-dashed"></span>

          <span
            className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold ${
              step > 3
                ? "bg-[var(--blue)] text-white"
                : "bg-[##B3C7D0] text-[#668796]"
            }`}
          >
            04
          </span>
          <span className="flex w-[84px] h-[1px] border-[1.5px] border-[var(--blue)] border-dashed"></span>

          <span
            className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold ${
              step > 4
                ? "bg-[var(--blue)] text-white"
                : "bg-[##B3C7D0] text-[#668796]"
            }`}
          >
            05
          </span>
        </div>

        <div className="my-10 mx-auto text-center">
          <p className="">{questions[step - 1]?.title}</p>
          <div className="my-4 pt-3 flex flex-wrap gap-2 justify-center">
            {questions[step - 1]?.options === "location" && (
                <div className="relative">
              <InputField
                label="Location"
                type="text"
                className={`my-2 sm:w-[200px]`}
                value={survey.location}
                onChange={(e) =>
                  setSurvey({
                    ...survey,
                    location: e.target.value,
                  })
                }
                icon={<SimpleLocation />}
              />
              <div className="absolute top-[60px] border left-0 min-w-[250px] sm:w-[200px] bg-white rounded-xl large-shadow overflow-hidden large-shadow z-[9] transition-all duration-300 py-2 px-2">
              <ul className={`list-none overflow-auto max-h-[120px] flex flex-col items-start`}>
                    {
                        locations.map((location:any, i: number) => {
                            return <li key={i} className={`px-3 py-2 cursor-pointer hover:bg-gray-50 text-start`}
                            onClick={(e)=>{fetchingCuisines(location.location_id)}}
                            >{location.name}</li>
                        })
                    }
                </ul>
              </div>
              </div>
            )}
            {questions[step - 1]?.occasions && (
              <SelectField
                label="Occassion"
                placeholder="Select ..."
                data={Occasions}
                className={`mr-2 sm:my-2 my-5 sm:w-[200px]`}
                styling={{
                  dropdownHeight: "max-h-[140px]",
                  shadow: "drop-shadow-xl ",
                  left: "0px",
                  top: "70px",
                }}
                value={survey.occassion}
                onChange={(val) => setSurvey({ ...survey, occassion: val })}
                onAdditionalChange={(_data) => {}}
              />
            )}
            {questions[step - 1]?.options === "activities" && (
              <SelectField
                label="Priority"
                placeholder="Select ..."
                data={Priorities}
                className={`mr-2 sm:my-2 my-5 sm:w-[200px]`}
                styling={{
                  dropdownHeight: "max-h-[140px]",
                  shadow: "drop-shadow-xl ",
                  left: "0px",
                  top: "70px",
                }}
                value={survey.activities}
                onChange={(val) => setSurvey({ ...survey, activities: val })}
                onAdditionalChange={(_data) => {}}
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
            className="text-[20px] py-[10px]"
            title={step < 5 ? "Next" : "Finish"}
            onClick={() => {
              if (step < 5) {
                setStep(step + 1);
              } else {
                setStep(1);
                onClose();
              }
            }}
          />
        </div>
      </div>
    </PopupWithOverlay>
  );
};

export default Survey;