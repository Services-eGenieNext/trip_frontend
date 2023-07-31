import React from 'react'
import PopupWithOverlay from '../UIComponents/Popup/PopupWithOverlay'
import TripDetail from './TripDetail'

interface ITripPlanPopup {
    item: any
    show: boolean
    onClose: () => void
}

const TripPlanPopup = ({item, show, onClose}: ITripPlanPopup) => {

    return (
        <PopupWithOverlay show={show} onClose={() => onClose()}  >
            <TripDetail item={item} />
        </PopupWithOverlay>
    )
}

export default TripPlanPopup