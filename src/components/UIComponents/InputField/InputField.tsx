import { IInputField } from '@/interfaces'
import React from 'react'

const InputField = ({className, label, type, value="", placeholder="", onChange= (e)=>{}}: IInputField) => {

    return (
        <div className="relative">
            <input 
                type={type ? type : 'text'} 
                className={`border border-[#C9D2DD] rounded-2xl py-4 px-5 w-full outline-none ${className}`} 
                placeholder={placeholder ? placeholder : label} 
                onChange={onChange}
                value={value}
            />
            <label className="absolute top-[-0.7rem] left-[1rem] px-[5px]"
            style={{background: "linear-gradient(360deg, #fff, #fff, #fff, transparent, transparent)"}}
            >{label}</label>
        </div>
    )

}

export default InputField