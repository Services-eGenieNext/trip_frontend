import BlueButton from '@/components/UIComponents/Buttons/BlueButton'
import PopupWithOverlay from '@/components/UIComponents/Popup/PopupWithOverlay'
import { ISurvey } from '@/interfaces'
import React, { useState } from 'react'

const Survey = ({show, onClose}:ISurvey) => {

    const [step, setStep] = useState(1)

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
                    <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</p>
                    <div className="my-4 flex justify-center">
                        <label className="mx-2">
                            <input type="radio" name="option" id="" /> Curabitur diam
                        </label>
                        <label className="mx-2">
                            <input type="radio" name="option" id="" /> Curabitur diam
                        </label>
                        <label className="mx-2">
                            <input type="radio" name="option" id="" /> Curabitur diam
                        </label>
                    </div>
                    <BlueButton type="button" className="text-[20px] py-[10px]" title={step < 5 ? 'Next' : 'Finish'} onClick={() => {
                        if(step<5)
                        {
                            setStep(step + 1)
                        }
                        else
                        {
                            setStep(0)
                            onClose()
                        }
                    }} />
                </div>
            </div>
        </PopupWithOverlay>
    )
}

export default Survey