import React, { useEffect, useState } from 'react'

interface IPopupOverlay {
    show: boolean
    onClose: () => void
    children: any
}

const PopupWithOverlay = ({children, show, onClose}: IPopupOverlay) => {

    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        setShowPopup(show)
    }, [show])

    return (
        <div className={`${showPopup ? 'block' : 'hidden'} fixed inset-0 z-10 bg-[rgba(0,0,0,0.5)] max-h-screen h-screen`}>
            <div className="flex justify-center items-center mt-[5%]">
                <div className="bg-white p-10 w-[900px] rounded-xl relative">
                    <span className="absolute top-[-1rem] right-[-0.5rem] w-[30px] h-[30px] bg-[#F9F9F9] flex justify-center items-center rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"
                        onClick={() => onClose()}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PopupWithOverlay