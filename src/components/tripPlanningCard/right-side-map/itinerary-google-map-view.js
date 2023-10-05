import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow as GoogleInfoWindow } from 'google-maps-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setActiveLocation } from '@/redux/reducers/itinerarySlice';
import BlueButton from '@/components/UIComponents/Buttons/BlueButton';
import { setItem } from '@/redux/reducers/PlacedetailSlice';
import WePlanIcon from "public/pin.png"

const mapStyles = {
  width: 'auto',
  height: '100%'
};

const ItineraryGoogleMapView = (props) => {

    const [allLocations, setAllLocations] = useState([])
    const [infoWindow, setInfoWindow] = useState({
        visible: false,
        marker: null
    })
    const { activeLocation } = useAppSelector(state => state.itineraryReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {

        setAllLocations(props.locations)

    }, [props.locations])

    const onMarkerClick = (props, marker, e, loc) => {
        setInfoWindow({
            visible: true,
            marker: marker
        })

        dispatch(setActiveLocation(loc))
    }

    const closeInfoWindow = () => {
        setInfoWindow({
            visible: false,
            marker: null
        })

        dispatch(setActiveLocation(null))
    }

    const viewDetail = () => {
        console.log('there')
        dispatch(setItem({
            locaiton_id: activeLocation?.location_id,
            place_id: activeLocation?.place_id,
        }));
    }

    const customMarkerIcon = {
        url: WePlanIcon.src,
        scaledSize: new props.google.maps.Size(40, 40)
    };

    return allLocations.length > 0 ? (
        <Map
            google={props.google}
            style={mapStyles}
            zoom={12}
            initialCenter={allLocations[0].geometry.location}
            center={allLocations[0].geometry.location}
        >
            {
                allLocations.map((loc, index) => (
                    <Marker 
                        key={index}
                        position={loc.geometry.location} 
                        onClick={(props, marker, e)=>onMarkerClick(props, marker, e, loc)}
                        name="Example Marker"
                        icon={customMarkerIcon}
                    />
                ))
            }

            <GoogleInfoWindow 
                marker={infoWindow.marker ?? null}
                visible={infoWindow.visible ?? false}
                onClose={closeInfoWindow}
            >
                <div className="flex flex-wrap flex-col items-center">
                    {
                        activeLocation && (
                            <>
                                <h3 className="font-semibold text-sm"> {activeLocation?.name} </h3>
                                <p>{activeLocation?.formatted_address}</p>
                                {/* <button className="w-max px-1 py-[0.3rem] mx-auto hover:text-[var(--blue)] large-shadow"
                                onClick={viewDetail}
                                >View detail</button> */}
                            </>
                        )
                    }
                </div>
            </GoogleInfoWindow>
        </Map>
    ) : (
        <div className='bg-gray-100 animate-pulse w-full h-full absolute inset-0'></div>
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY ?? ''
})(ItineraryGoogleMapView);
  