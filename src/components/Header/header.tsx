import Link from 'next/link'
import React from 'react'
import Logo from "/public/logo.svg"
import Image from 'next/image'

const Header = () => {
    return (
        <div className="sm-width h-[100px] flex items-center">
            <div className="grid grid-cols-12 mx-auto max-w-[500px] md:max-w-full w-full items-center">
                <div className="col-span-4">

                    {/* Menu Bar for Mobile Responsivness */}
                    <div className="block md:hidden px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>
                    </div>

                    {/* Menu Bar for Desktop */}
                    <div className="hidden md:block">
                        <Link href={'/'} className="p-4 lg:p-5">Results</Link>
                        <Link href={'/'} className="p-4 lg:p-5">Itinerary</Link>
                        <Link href={'/'} className="p-4 lg:p-5">Survey</Link>
                    </div>
                </div>
                <div className="m-auto col-span-4">
                    {/* WebSite Logo */}
                    <Image src={Logo} alt='logo' />
                </div>
                <div className="col-span-3">
                    <div className="hidden md:flex items-center justify-between border-l md:pl-3 lg:pl-6 xl:pl-16">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>

                        <Link href={'/'} >Login</Link>

                        <button className="bg-black py-3 px-4 lg:px-8 rounded-md text-white">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header