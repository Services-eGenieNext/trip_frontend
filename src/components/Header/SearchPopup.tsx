import React, { useState } from 'react'
import PopupWithOverlay from '../UIComponents/Popup/PopupWithOverlay'
import InputField from '../UIComponents/InputField/InputField'
import ProductImg from "/public/static/restaurants.jpg"
import LocationIcon from '../icons/Location'
import Image from 'next/image'

interface ISearchPopup {
    show: boolean,
    onClose: () => void
}

const SearchPopup = ({show, onClose}: ISearchPopup)=> {

    const List = [0,1,2,3,4,5,6,7]
    const [searchInput, setSearchInput] = useState("")

    return (
        <PopupWithOverlay show={show} onClose={() => {onClose()}}>
            <div className="px-4">
                <InputField type="text" label="Search" placeholder='Find your best ...' onChange={(e) => setSearchInput(e.target.value)} />

                {
                    searchInput.length > 0 && (
                        <div className="grid grid-cols-1 py-4">
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

        </PopupWithOverlay>
    )
}

export default SearchPopup