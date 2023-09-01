import { IDateRangeField } from '@/interfaces/input'
import React, { useEffect, useRef, useState } from 'react'
import { addDays } from 'date-fns';
import { DateRange, Range } from "react-date-range"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface IDate extends Range {
    endDateChanged?: boolean
}

const DateRangeField = ({className, label, value, placeholder="", icon, onChange= (val: Range)=>{}}: IDateRangeField) => {

    let startDate = new Date()
    let endDate = new Date()
    endDate.setDate(endDate.getDate() + 6)

    const [date, setDate] = useState<IDate>(value)

    const [openDropDown, setOpenDropDown] = useState(false)
    const selectRef = useRef<HTMLDivElement | null>(null)
    const dropDownRef = useRef<HTMLDivElement | null>(null)
    const dateRangeErrorRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        onChange(date)
    }, [date])

    useEffect(() => {
        if(selectRef)
        {
            window.addEventListener('click', (e) => {
                if(selectRef.current)
                {
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
            dropDownRef.current?.classList.add('opacity-0')
            dropDownRef.current?.classList.add('-translate-y-5')
            setTimeout(() => {
                dropDownRef.current?.classList.add('hidden')
            }, 200);

            if(!date.endDateChanged)
            {
                dateRangeErrorRef.current?.classList.remove('hidden')
                setTimeout(() => {
                    dateRangeErrorRef.current?.classList.remove('opacity-0')
                    dateRangeErrorRef.current?.classList.remove('-translate-y-full')
                    dateRangeErrorRef.current?.classList.add('-translate-y-1/2')
                }, 200);

                setTimeout(() => {
                    dateRangeErrorRef.current?.classList.add('opacity-0')
                    dateRangeErrorRef.current?.classList.remove('-translate-y-1/2')
                    dateRangeErrorRef.current?.classList.add('-translate-y-full')
                    setTimeout(() => {
                        dateRangeErrorRef.current?.classList.add('hidden')
                    }, 200);
                }, 3000)
            }
        }
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
                <div className="absolute top-[-0.5rem] left-0 w-full flex justify-center items-center">
            <label className="px-[5px] text-[11px] uppercase letter-spacing"
            style={{background: "linear-gradient(360deg, #fff, #fff, #fff, transparent, transparent)"}}
            >{label}</label>
            </div>
            </div>

            <div ref={dropDownRef} className={`hidden opacity-0 absolute top-[50px] sm:min-w-[250px] min-w-full bg-white border-gray-100 rounded-xl large-shadow overflow-hidden large-shadow z-[9] transition-all duration-300`}>
                <DateRange 
                    minDate={addDays(new Date(), -0)}
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    ranges={[{
                        ...date,
                        startDate: date.startDate ? date.startDate : startDate,
                        endDate: date.endDate ? date.endDate : endDate
                    }]}
                    showDateDisplay={false}
                    onChange={(item) => {
                        console.log('item', item)
                        let _item = item
                        let endDateChanged = true
                        if(_item.selection.startDate === _item.selection.endDate)
                        {
                            endDateChanged = false
                            const endDate: any = _item.selection.startDate
                            _item.selection.endDate = addDays(endDate, 6)
                        }

                        setDate({...item.selection, endDateChanged: endDateChanged})
                    }}
                />
            </div>

            <div ref={dateRangeErrorRef} className="fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 rounded-lg bg-yellow-50 text-yellow-500 large-shadow p-4 z-10 transition-all duration-300">
                <p className="flex"> 
                <span className='mr-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                </span>
                End date is not selected yet in {label}!</p>
            </div>
        </div>
    )

}

export default DateRangeField