import {useState, useRef, useEffect} from 'react'
import Image from 'next/image'
import React from 'react'
import ProductImg from "/public/static/restaurants.jpg"
import LocationIcon from '../icons/Location'
import Map from "/public/images/full-map-transparent.png"
import Link from 'next/link'
import ComponentTitle from '../UIComponents/ComponentTitle'
import Modal from '../Modal'
import { useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import { setLocationAddress } from '@/redux/reducers/locationSlice'

interface IProduct {
    title: string
    isAddButton?: boolean
}

const Products = ({ title = "Title", isAddButton }: IProduct) => {

    const List = [0,1,2,3,4,5,6,7]
    const slideRef = useRef<null | HTMLDivElement>(null)
    const formRef = useRef<null | HTMLDivElement>(null)
    
    const [visible, setVisible] = useState(false)
    const [xPosition, setXPosition] = useState(0)
    const [yPosition, setYPosition] = useState(0)
    const [openModal, setOpenModal] = useState(false)

    const { restaurantsState } = useAppSelector((state) => state.restaurantsReducer)
    const { locationAddress } = useAppSelector((state) => state.locationReducer)

    const placeForm = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        formRef.current?.classList.add('hidden')
        setTimeout(() => {
            formRef.current?.classList.remove('hidden')
        }, 300);

        if(slideRef.current)
        {
            let xposition = (event.clientX - slideRef.current?.offsetLeft - slideRef.current?.offsetWidth/3);
            let yposition = (event.clientY - slideRef.current?.offsetTop - slideRef.current?.offsetHeight/3);

            setXPosition(xposition)
            setYPosition(yposition)
            setVisible(true)
        }
    }

    const route = useRouter()
    const onSetAddress = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, address: string) => {
        e.preventDefault()
        setLocationAddress(address)
        route.push('trip-plan')
    }

    return (
        <div className="relative px-10">

            <Image src={Map} alt='Map 1' className="absolute left-10 top-[5rem] -z-10 select-none" />

            <Image src={Map} alt='Map 1' className="absolute right-10 top-[70%] -z-10 select-none" />
            <div className='sm-width text-center md:text-left'>
                <div className="sm:px-4 my-10 md:mt-20">
                    <ComponentTitle title={title} />
                    <p className='text-[var(--gray)]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {
                        restaurantsState?.map((restaurant, index) => {
                            let image_path = restaurant.images[0]?.images?.original?.url ?? restaurant.images[0]?.images?.large?.url
                            let caption = restaurant.images.length > 0 ? restaurant.images[0].caption : restaurant.name
                            return <div key={index} className="sm:m-4 my-4 mx-0">
                                <div className="rounded-xl overflow-hidden shadow grid grid-cols-1 md:grid-cols-2 bg-white h-full">
                                    <div className="relative w-full h-[300px] md:h-full">
                                        <Image src={image_path} fill={true} alt={caption} className="object-cover" />
                                    </div>
                                    <div className="p-7">
                                        <div className='flex justify-between items-center'>
                                        <Link href={'/trip-plan'} onClick={(e) => {onSetAddress(e, restaurant.address_obj.address_string)}}>
                                            <h4 className="text-2xl font-semibold gilroy">{caption}</h4>
                                        </Link>
                                        {
                                                isAddButton && (
                                                    <div className="flex justify-end items-center gap-2 cursor-pointer"
                                                    onClick={() => {setOpenModal(true)}}
                                                    >
                                                        <span className="text-[11px] text-[var(--green)]">Add</span>
                                                        <span className="w-[23px] h-[23px] rounded-full bg-[var(--lite-green)] hover:bg-[var(--green)] text-[var(--green)] hover:text-white flex justify-center items-center transition-all duration-300">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-[15px] h-[15px]">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="flex flex-wrap items-center my-2"> 
                                            <span className="p-1 bg-[#9AB044] rounded-full"> <LocationIcon className="h-5 w-5 bg-[#9AB044]" /> </span>
                                            <span className="ml-2"> {restaurant.address_obj.city} </span>
                                        </div>
                                        <p className="text-[var(--gray)]">{restaurant.address_obj.address_string}</p>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            {openModal == true ? (
                <Modal openModal={openModal} setOpenModal={setOpenModal} modalFor="view_otehr_places" />
            ):(
                ""
            )}
        </div>
    )
}

export default Products