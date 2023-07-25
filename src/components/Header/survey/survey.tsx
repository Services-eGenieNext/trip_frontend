import BlueButton from '@/components/UIComponents/Buttons/BlueButton'
import PopupWithOverlay from '@/components/UIComponents/Popup/PopupWithOverlay'
import { ISurvey } from '@/interfaces'
import React, { useState } from 'react'
import Occasions from '@/data/occasion.json'

const Survey = ({show, onClose}:ISurvey) => {

    const [step, setStep] = useState(1)

    const questions = [
        {
            title: "Do you have any ideas where you want to go?",
            options: [
                "Yes, I think I have it sorted by continent",
                "Yes, I think I have it sorted by country",
                "Yes, I think I have it sorted by sorted",
                "I’m open to all suggestions",
                "No, but I know where I don’t want to go"
            ]
        },
        {
            title: "Are you celebrating anything special?",
            occasions: true
        },
        {
            title: "What sorts of activities would you like prioritized?",
            options: []
        },
        {
            title: "Rank your favorite cuisines",
            options: []
        },
        {
            title: "Anything else you’d like us to know?",
            text_box: true
        }
    ]

    return (
        <PopupWithOverlay show={show} onClose={() => {onClose()}} >
            <h3 className="capitalize text-[33px] leading-[38.84px] font-medium text-center">{'Please answer our questions'}</h3>
            <p className="text-[16px] leading-[24px] text-center my-2 text-[var(--gray)]">We keep track of what cities are on the rise and which ones are falling so you can stress less and focus more on living your best vacation life!</p>

            <div className="bg-[#FAFDFF] bg-opacity-50 border border-dashed border-[var(--blue)] rounded-xl p-4">
                <div className="flex flex-wrap gap-2 items-center justify-center">
                    <span className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold ${step > 0 ? 'bg-[var(--blue)] text-white' : 'bg-[##B3C7D0] text-[#668796]'}`}>
                        01
                    </span>
                    <span className="flex w-[84px] h-[1px] border-[1.5px] border-[var(--blue)] border-dashed"></span>

                    <span className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold ${step > 1 ? 'bg-[var(--blue)] text-white' : 'bg-[##B3C7D0] text-[#668796]'}`}>
                        02
                    </span>
                    <span className="flex w-[84px] h-[1px] border-[1.5px] border-[var(--blue)] border-dashed"></span>

                    <span className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold ${step > 2 ? 'bg-[var(--blue)] text-white' : 'bg-[##B3C7D0] text-[#668796]'}`}>
                        03
                    </span>
                    <span className="flex w-[84px] h-[1px] border-[1.5px] border-[var(--blue)] border-dashed"></span>

                    <span className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold ${step > 3 ? 'bg-[var(--blue)] text-white' : 'bg-[##B3C7D0] text-[#668796]'}`}>
                        04
                    </span>
                    <span className="flex w-[84px] h-[1px] border-[1.5px] border-[var(--blue)] border-dashed"></span>

                    <span className={`flex justify-center items-center rounded-full border-4 border-[#C6E2EE] w-[50px] h-[50px] font-bold ${step > 4 ? 'bg-[var(--blue)] text-white' : 'bg-[##B3C7D0] text-[#668796]'}`}>
                        05
                    </span>
                </div>

                <div className="my-10 mx-auto text-center">
                    <p className="">{questions[step-1]?.title}</p>
                    <div className="my-4 flex flex-wrap gap-2 justify-center">
                        {
                            questions[step-1]?.options && questions[step-1].options?.map((option, index) => {
                                return <label className="mx-2" key={index}>
                                    <input type="radio" name="option" id="" /> {option}
                                </label>
                            })
                        }
                        {
                            questions[step-1]?.occasions && Occasions.map((occ, index) => {
                                return <label className="mx-2" key={index}>
                                    <input type="checkbox" name="occasions[]" id="" /> {occ.value}
                                </label>
                            })
                        }
                        {
                            questions[step-1]?.text_box && (
                                <textarea className="border border-solid border-[var(--blue)] rounded-xl w-full p-4 outline-none" rows={5} placeholder="Type here ..."></textarea>
                            )
                        }
                    </div>
                    <BlueButton type="button" className="text-[20px] py-[10px]" title={step < 5 ? 'Next' : 'Finish'} onClick={() => {
                        if(step<5)
                        {
                            setStep(step + 1)
                        }
                        else
                        {
                            setStep(1)
                            onClose()
                        }
                    }} />
                </div>
            </div>
        </PopupWithOverlay>
    )
}

export default Survey