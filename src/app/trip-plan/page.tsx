"use client"

import { DetailCall, LocationsCall } from '@/api-calls'
import { DetailsCallByGoogle } from '@/api-calls/location-details-call'
import ClientTestimonials from '@/components/Client-Testimonials/client-testimonials'
import PageBanner from '@/components/PageBanner/PageBanner'
import ProductHorizontalSlide from '@/components/Products/ProductHorizontalSlide'
import Products from '@/components/Products/Products'
import SmallStory from '@/components/Story/SmallStory'
import TripPlanningCard from '@/components/tripPlanningCard/tripPlanning'
import { useAppSelector } from '@/redux/hooks'
import { setLocations } from '@/redux/reducers/locationSlice'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const TripPlan = () => {

    const params = useSearchParams()
    const [params_list, setParamsList] = useState({address: '', location_id: '', place_id: ''})
    const { locationsState } = useAppSelector((state) => state.locationReducer)
    const [automateLocation, setAutomateLocation] = useState<any | null>(null)
    const [openingHours, setOpeningHours] = useState<number | null>(null)

    const dispatch = useDispatch()

    useEffect(() => {
        const _defLocationToVisit = async () => {
            let res = await LocationsCall("locations near " + automateLocation.name)
            dispatch(setLocations(res))
        }
        if(automateLocation && automateLocation.name)
        {
            _defLocationToVisit()
        }
    }, [automateLocation])

    useEffect(() => {
        const _defLocation = async () => {
            if(params_list.location_id)
            {
                let item_Detail: any = await DetailCall(params_list.location_id)
                setAutomateLocation(item_Detail.data)
            }
            else if(params_list.place_id)
            {
                let item_Detail: any = await DetailsCallByGoogle(params_list.place_id)
                setAutomateLocation(item_Detail.data.result)
                console.log('automate locations',item_Detail.data.result)
                setOpeningHours(item_Detail.data.result.opening_hours.weekday_text?.filter((_week: any) => _week.toLowerCase().search('closed') == -1 ).length)
            }
        }
        _defLocation()

    }, [params_list])

    useEffect(() => {
        let _address: any = params.get('address')
        let _location_id: any = params.get('location_id')
        let _place_id: any = params.get('place_id')
        setParamsList({
            address: _address ?? 'best locations',
            location_id: _location_id ?? '',
            place_id: _place_id ?? ''
        })
    }, [params])

    return (
        <div>
            <PageBanner title={automateLocation?.name ?? 'Trip Plan'} automateLocation={automateLocation} />
          
            <TripPlanningCard address={`${params_list.address}`} totalOpeningHours={openingHours} automateLocation={automateLocation} />

            <ProductHorizontalSlide locationsState={locationsState} url="variation_2" Title={`${automateLocation?.name} Location To Visit`} Description={automateLocation?.location_id ? automateLocation?.description : (automateLocation?.editorial_summary?.overview ?? '')} isAddButton={true} isDesc={true} />

            <Products title="Most popular Restaurants" isAddButton={true} rows="2" />

            <SmallStory positioning="inline" />

            <ClientTestimonials />
        </div>
    )
}

export default TripPlan