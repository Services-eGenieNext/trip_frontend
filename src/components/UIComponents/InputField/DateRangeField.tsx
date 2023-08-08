import { IDateRangeField } from '@/interfaces/input'
import React, { useEffect, useRef, useState } from 'react'
import { addDays } from 'date-fns';
import { DateRange, Range } from "react-date-range"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateRangeField = ({className, label, value, placeholder="", icon, onChange= (val: Range)=>{}}: IDateRangeField) => {

    const [date, setDate] = useState<Range>(value)

    const [openDropDown, setOpenDropDown] = useState(false)
    const selectRef = useRef<HTMLDivElement | null>(null)
    const dropDownRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        onChange(date)
    }, [date])

    useEffect(() => {
        if(selectRef)
        {
            window.addEventListener('click', (e) => {
                if(selectRef.current)
                {
                    console.log('window event',selectRef.current.contains((e.target as Element)))
                    if(!selectRef.current.contains((e.target as Element)))
                    {
                        setOpenDropDown(false)
                    }
                }
            })
        }
    }, [])

    useEffect(() => {
        if(openDropDown)
        {
            dropDownRef.current?.classList.remove('hidden')
            setTimeout(() => {
                dropDownRef.current?.classList.remove('opacity-0')
                dropDownRef.current?.classList.remove('-translate-y-5')
            }, 100);
        }
        else
        {
            console.log('openDropDown', openDropDown)
            dropDownRef.current?.classList.add('opacity-0')
            dropDownRef.current?.classList.add('-translate-y-5')
            setTimeout(() => {
                dropDownRef.current?.classList.add('hidden')
            }, 200);
        }
        console.log('openDropDown', openDropDown)
    }, [openDropDown])

    return (
        <div ref={selectRef} className={`relative cursor-pointer select-none ${className}`}>
            <div className="relative">
                <span className="border border-[#C9D2DD] bg-white rounded-2xl py-4 px-5 flex items-center justify-between"
                onClick={() => setOpenDropDown(!openDropDown)}
                >
                    <div className="flex items-center">
                        {
                            icon && <span className="mr-2">{icon}</span>
                        }
                        <span className={`${value.startDate ? 'text-black' : `text-[var(--lite-gray)]`} overflow-ellipsis overflow-hidden whitespace-nowrap`}>
                            {value?.startDate ? `${new Date(value.startDate).toLocaleDateString()}${ value?.endDate ? ' - ' + new Date(value?.endDate).toLocaleDateString() : ''}` : (placeholder ? placeholder : label)}
                        </span>
                    </div>
                    <span className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </span>
            </div>
            <label className="absolute top-[-0.3rem] left-[1rem] px-[5px] text-[9px] uppercase letter-spacing"
            style={{background: "linear-gradient(360deg, #fff, #fff, #fff, transparent, transparent)"}}
            >{label}</label>

            <div ref={dropDownRef} className={`hidden opacity-0 absolute top-[50px] min-w-[250px] w-auto bg-white border-gray-100 rounded-xl large-shadow overflow-hidden large-shadow z-[9] transition-all duration-300`}>
                <DateRange 
                    minDate={addDays(new Date(), -0)}
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    ranges={[date]}
                    onChange={(item) => {
                        setDate(item.selection)
                    }}
                />
            </div>
        </div>
    )

}

export default DateRangeField