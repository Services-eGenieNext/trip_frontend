import React from 'react'

interface ISection {
    children: React.ReactNode
    className?: string
}

const Section = ({children, className}: ISection) => {
    return (
        <div className={`xl:w-[75%] w-[90%] text-center md:text-left ${className}`}>
            <div className="sm:px-4 my-10 md:my-20">
                {children}
            </div>
        </div>
    )
}

export default Section