"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Logo from "/public/logo.svg"
import Image from 'next/image'
import PopupWithOverlay from '../UIComponents/Popup/PopupWithOverlay'

const Header = () => {
    
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const [showPopup, setShowPopup] = useState(false)


    useEffect(() => {
        window.addEventListener('scroll', () =>{
            if(window.scrollY > 100)
            {
                if(!document.querySelector('#header')?.classList.contains('bg-white'))
                {
                    document.querySelector('#header')?.classList.add('bg-white')
                }
            }
            else
            {
                if(document.querySelector('#header')?.classList.contains('bg-white'))
                {
                    document.querySelector('#header')?.classList.remove('bg-white')
                }
            }
        })
    }, [])

    return (
        <div id={'header'} className="w-full sticky top-0 z-10 transition-all duration-300">
            <div className="sm-width h-[100px] flex items-center">
                <div className="grid grid-cols-12 mx-auto max-w-[500px] md:max-w-full w-full items-center px-4">
                    <div className="col-span-4">

                        {/* Menu Bar for Mobile Responsivness */}
                        <div className="block md:hidden px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"
                            onClick={() => setOpenMobileMenu(!openMobileMenu)}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                            </svg>
                        </div>

                        {/* Menu Bar for Desktop */}
                        <div className="hidden md:block">
                            <Link href={'/'} className="p-4 lg:p-5 hover:text-[var(--blue)] transition-all duration-300">Results</Link>
                            <Link href={'/'} className="p-4 lg:p-5 hover:text-[var(--blue)] transition-all duration-300">Itinerary</Link>
                            <Link href={'/'} className="p-4 lg:p-5 hover:text-[var(--blue)] transition-all duration-300">Survey</Link>
                        </div>
                    </div>
                    <div className="m-auto col-span-4">
                        {/* WebSite Logo */}
                        <Image src={Logo} alt='logo' />
                    </div>
                    <div className="col-span-4">
                        <div className="hidden md:flex items-center justify-between border-l md:pl-3 lg:pl-6 xl:pl-16">

                            {/* Search Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 cursor-pointer"
                            onClick={() => setShowPopup(true)}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>

                            <Link href={'/'} >Login</Link>

                            <button className="bg-black py-3 px-4 lg:px-8 rounded-md text-white">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Popup */}
            <PopupWithOverlay show={showPopup} onClose={() => {setShowPopup(false)}}>
                <div className="relative">
                <input className="border border-[#C9D2DD] rounded-2xl py-4 px-5 w-full outline-none" placeholder="Find your best ..." />
                <label className="absolute top-[-0.7rem] left-[1rem] bg-white px-[5px]">Search</label>
                </div>
            </PopupWithOverlay>

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
                    <Link href={'/'} className="p-4 lg:p-5">Results</Link>
                    <Link href={'/'} className="p-4 lg:p-5">Itinerary</Link>
                    <Link href={'/'} className="p-4 lg:p-5">Survey</Link>
                </div>

                <div className="flex flex-col justify-between px-16">
                    <button className="bg-transparent border hover:bg-black hover:text-white py-3 px-4 lg:px-8 rounded-md text-black mb-5 transition-all duration-300">Login</button>

                    <button className="bg-black py-3 px-4 lg:px-8 rounded-md text-white">Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Header