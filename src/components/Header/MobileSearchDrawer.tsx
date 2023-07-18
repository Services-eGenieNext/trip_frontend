import React, { useState } from 'react'
import InputField from '../UIComponents/InputField/InputField'
import Image from 'next/image'
import LocationIcon from '../icons/Location'
import ProductImg from "/public/static/restaurants.jpg"

interface IMobileSearchDrawer {
    show: boolean,
    onClose: () => void
}

const MobileSearchDrawer = ({show, onClose}: IMobileSearchDrawer) => {

    const List = [0,1,2,3,4,5,6,7]
    const [searchInput, setSearchInput] = useState("")

    return (
        <div className={`fixed inset-0 bg-slate-100 z-10 ${!show ? 'translate-x-full' : 'translate-x-0'} duration-500 transition-all`}>
            
            <div className="absolute top-2 right-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
                onClick={() => onClose()}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div className="mt-16 mx-3">
                <div className="mb-2 mr-3">
                    <InputField 
                        type="text" 
                        label="Search" 
                        value={searchInput} 
                        onChange={(e) => setSearchInput(e.target.value)} 
                        placeholder="Find your best ..."
                    />
                </div>

                {
                    searchInput.length > 0 && (
                        <div className="grid grid-cols-1 pr-2 max-h-[80vh] overflow-auto">
                            {
                                List.map((l, index) => {
                                    return <div key={index} className="py-4 pt-0">
                                        <div className="rounded-xl overflow-hidden shadow grid grid-cols-1 md:grid-cols-4 bg-white">
                                            <div className="relative w-full h-[300px] md:h-full col-span-1">
                                                <Image src={ProductImg} fill={true} alt={'Product'} className="object-cover" />
                                            </div>
                                            <div className="p-3 col-span-3">
                                                <h4 className="font-medium">Lorem Ipsum</h4>
                                                <div className="flex flex-wrap items-center my-1"> 
                                                    <span className="p-1 bg-[#9AB044] rounded-full"> <LocationIcon className="h-3 w-3 bg-[#9AB044]" /> </span>
                                                    <span className="ml-2 text-sm"> Morocco </span>
                                                </div>
                                                <p className="text-[var(--gray)] text-sm">It is a long established fact that a reader will be distracted by the readable content.</p>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MobileSearchDrawer