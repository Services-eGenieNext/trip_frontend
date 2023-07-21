import { ISelectField } from '@/interfaces/input'
import React, { useEffect, useRef, useState } from 'react'

const SelectField = ({className, label, data=[], value, placeholder="", onChange= (e)=>{}, icon}: ISelectField) => {

    const [openDropDown, setOpenDropDown] = useState(false)
    const selectRef = useRef<HTMLDivElement | null>(null)
    const dropDownRef = useRef<HTMLDivElement | null>(null)

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
                    {
                        icon && <span className="mr-1">{icon}</span>
                    }
                    <span className={`${value ? 'text-black' : `text-[var(--lite-gray)]`}`}>{value ? (value.length > 10 ? `${value.substring(0, 10)}...` : value) : (placeholder ? placeholder : label)}</span>
                    <span className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                    {/* <input 
                        type={type ? type : 'text'} 
                        className={`outline-none w-full`} 
                        placeholder={placeholder ? placeholder : label} 
                        onChange={onChange}
                        value={value}
                    /> */}
                </span>
            </div>
            <label className="absolute top-[-0.7rem] left-[1rem] px-[5px]"
            style={{background: "linear-gradient(360deg, #fff, #fff, #fff, transparent, transparent)"}}
            >{label}</label>

            <div ref={dropDownRef} className={`hidden opacity-0 absolute top-[50px] min-w-[250px] w-full bg-white border-gray-100 rounded-xl large-shadow overflow-hidden large-shadow z-10 transition-all duration-300`}>
                <ul className="list-none max-h-[300px] overflow-auto">
                    {
                        data.map((d: string | number, i: number) => {
                            return <li key={i} className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${value === d ? 'bg-[var(--dim-gray)]' : ''}`}
                            onClick={() => {
                                setOpenDropDown(false)
                                onChange(d)
                            }}
                            >{d}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )

}

export default SelectField