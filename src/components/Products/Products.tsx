import Image from 'next/image'
import React from 'react'
import ProductImg from "/public/static/restaurants.jpg"
import LocationIcon from '../icons/Location'
import Map from "/public/images/full-map-transparent.png"

const Products = () => {

    const List = [0,1,2,3,4,5,6,7]
    return (
        <div className="relative">

            <Image src={Map} alt='Map 1' className="absolute left-10 top-[5rem] -z-10 select-none" />

            <Image src={Map} alt='Map 1' className="absolute right-10 top-[70%] -z-10 select-none" />
            <div className='sm-width text-center md:text-left'>
                <div className="px-4 my-10 md:my-20">
                    <h3 className="font-semibold text-2xl md:text-4xl">Top Restaurants In The World</h3>
                    <p className='text-[var(--gray)]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
                    {
                        List.map((l, index) => {
                            return <div key={index} className="p-4 pt-0">
                                <div className="rounded-xl overflow-hidden shadow grid grid-cols-1 md:grid-cols-2 bg-white">
                                    <div className="relative w-full h-[300px] md:h-full">
                                        <Image src={ProductImg} fill={true} alt={'Product'} className="object-cover" />
                                    </div>
                                    <div className="p-7">
                                        <h4 className="text-2xl font-medium">Lorem Ipsum</h4>
                                        <div className="flex flex-wrap items-center my-2"> 
                                            <span className="p-1 bg-[#9AB044] rounded-full"> <LocationIcon className="h-5 w-5 bg-[#9AB044]" /> </span>
                                            <span className="ml-2"> Morocco </span>
                                        </div>
                                        <p className="text-[var(--gray)]">It is a long established fact that a reader will be distracted by the readable content.</p>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Products