"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Logo from "/public/logo.svg"
import Image from 'next/image'
import SearchPopup from './SearchPopup'
import MobileSearchDrawer from './MobileSearchDrawer'
import Survey from './survey/survey'
import { useAppDispatch } from '@/redux/hooks'
import { setLocations } from '@/redux/reducers/locationSlice'
import { LocationsCall, ReviewsCall } from '@/api-calls'
import { setRestaurants } from '@/redux/reducers/restaurantsSlice'
import {setActivities} from '@/redux/reducers/popularActivities'
import { setReviews } from '@/redux/reducers/reviews'
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter()
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const [openMobileSearch, setOpenMobileSearch] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [showSurvey, setShowSurvey] = useState(false)

    const dispatch = useAppDispatch()

    useEffect(() => {
        const _def = async () => {
            let res = await LocationsCall("best places for visit in world for tourist")
            console.log("locations 2",res)
            dispatch(setLocations(res))
        }
        _def()

        const _defRestaurants = async () => {
            let res = await LocationsCall("best resturants for visit in world for tourist")
            console.log('resturants 3',res)
            dispatch(setRestaurants(res))
        }
        _defRestaurants()

        const activities = async () => {
            let res = await LocationsCall("best activities for tourist in world")
            console.log('object activities 4', res)
            dispatch(setActivities(res))
        }
        activities()

        const reviews = async () => {
            let reviewsRes = await ReviewsCall()
            console.log("reviewsRes",reviewsRes)
            dispatch(setReviews(reviewsRes))
        }
        reviews()
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', () =>{
            if(window.scrollY > 10)
            {
                if(!document.querySelector('#header')?.classList.contains('bg-white'))
                {
                    document.querySelector('#header')?.classList.add('bg-white')
                }

                if(!document.querySelector('#header')?.classList.contains('shadow'))
                {
                    document.querySelector('#header')?.classList.add('shadow')
                }
            }
            else
            {
                if(document.querySelector('#header')?.classList.contains('bg-white'))
                {
                    document.querySelector('#header')?.classList.remove('bg-white')
                }

                if(document.querySelector('#header')?.classList.contains('shadow'))
                {
                    document.querySelector('#header')?.classList.remove('shadow')
                }
            }
        })
    }, [])

    return (
        <div id={'header'} className="w-full sticky top-0 sm:z-20 z-10 transition-all duration-300">
            <div className="sm-width h-[100px] flex items-center">
                <div className="grid grid-cols-12 mx-auto max-w-[500px] md:max-w-full w-full items-center px-4">
                    <div className="col-span-4">

                        {/* Menu Bar for Mobile Responsivness */}
                        <div className="block md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"
                            onClick={() => setOpenMobileMenu(!openMobileMenu)}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                            </svg>
                        </div>

                        {/* Menu Bar for Desktop */}
                        <div className="hidden md:block">
                            <Link href={'/results'} className="p-4 lg:p-5 hover:text-[var(--blue)] transition-all duration-300">Results</Link>
                            <Link href={'/trip-plan-v1'} className="p-4 lg:p-5 hover:text-[var(--blue)] transition-all duration-300">Itinerary</Link>
                            <Link href={'/'} onClick={(e) => {
                                e.preventDefault()
                                setShowSurvey(true)
                            }} className="p-4 lg:p-5 hover:text-[var(--blue)] transition-all duration-300">Survey</Link>
                        </div>
                    </div>
                        
                    {/* WebSite Logo */}
                    <div className="m-auto col-span-4">
                        <Link href={'/'}>
                            <Image src={Logo} alt='logo' />
                        </Link>
                    </div>

                    {/* Header Right Side */}
                    <div className="col-span-4">
                        <div className="hidden md:flex items-center justify-end border-l md:pl-3 lg:pl-6 xl:pl-16">

                            {/* Desktop Search Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 cursor-pointer"
                            onClick={() => setShowPopup(true)}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>

                            {/* <Link href={'/'} >Login</Link>

                            <button className="bg-black py-3 px-4 lg:px-8 rounded-md text-white">Sign Up</button> */}
                        </div>

                        {/* Mobile Search Icon */}
                        <div className="block md:hidden px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 cursor-pointer ml-auto" 
                            onClick={() => setOpenMobileSearch(!openMobileSearch)}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Popup */}
            <SearchPopup show={showPopup} onClose={() => setShowPopup(false)} />

            {/* Responsive Mobile Menu */}
            <div className={`fixed inset-0 bg-slate-100 z-10 ${!openMobileMenu ? '-translate-x-full' : 'translate-x-0'} duration-500 transition-all`}>
                <div className="absolute top-2 right-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
                    onClick={() => setOpenMobileMenu(!openMobileMenu)}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className="flex flex-col my-5">
                    <div className="p-4 lg:p-5" onClick={()=>{
                        setOpenMobileMenu(false)
                        router.push('/results?address=USA')
                    }}>Results</div>
                    <div className="p-4 lg:p-5" onClick={()=>{
                        setOpenMobileMenu(false)
                        router.push('/trip-plan-v1?address=USA')
                    }}>Itinerary</div>
                    <div className="p-4 lg:p-5" onClick={()=>{
                        setOpenMobileMenu(false)
                        setShowSurvey(true)
                    }}>Survey</div>
                </div>
            </div>

            {/* Mobile Responsive Search Drawer */}
            <MobileSearchDrawer show={openMobileSearch} onClose={()=>setOpenMobileSearch(!openMobileSearch)} />

            <Survey show={showSurvey} onClose={() => setShowSurvey(false)} />
        </div>
    )
}

export default Header