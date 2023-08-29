"use client"

import { DetailCall, LocationsCall } from '@/api-calls'
import { DetailsCallByGoogle } from '@/api-calls/location-details-call'
import ClientTestimonials from '@/components/Client-Testimonials/client-testimonials'
import PageBanner from '@/components/PageBanner/PageBanner'
import ProductHorizontalSlide from '@/components/Products/ProductHorizontalSlide'
import Products from '@/components/Products/Products'
import SmallStory from '@/components/Story/SmallStory'
import TripPlanReviews from '@/components/trip-plan/trip-plan-reviews'
import TripPlanningCard from '@/components/tripPlanningCard/tripPlanning'
import { useAppSelector } from '@/redux/hooks'
import { setLocations } from '@/redux/reducers/locationSlice'
import { setRestaurants } from '@/redux/reducers/restaurantsSlice'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const TripPlan = () => {

    const params = useSearchParams()
    const [params_list, setParamsList] = useState<any>({address: '', location_id: '', place_id: '', v_type: '', restaurants: null, start_day_index: '', days_length: ''})
    const { locationsState } = useAppSelector((state) => state.locationReducer)
    const [automateLocation, setAutomateLocation] = useState<any | null>(null)
    const [openingHours, setOpeningHours] = useState<number | null>(null)

    const dispatch = useDispatch()

    const _defLocationToVisit = async (query: string) => {
        if(query)
        {
            let res = await LocationsCall(`best places for visit in ${query} for tourist `)
            dispatch(setLocations(res))
        }
    }

    const _defRestaurantsToVisit = async (query: string) => {
        if(query)
        {
            let res = await LocationsCall("restaurants in " + query)
            dispatch(setRestaurants(res))
        }
    }

    useEffect(() => {
        const _defLocation = async () => {
            let locationString = ''
            if(params_list.location_id)
            {
                let item_Detail: any = await DetailCall(params_list.location_id)
                if(item_Detail.data)
                {
                    setAutomateLocation(item_Detail.data)
                    let _locationStringArr = item_Detail.data.address_obj.address_string.split(' ')
                    locationString = _locationStringArr[_locationStringArr.length - 1]
                }
            }
            else if(params_list.place_id)
            {
                let item_Detail: any = await DetailsCallByGoogle(params_list.place_id)
                if(item_Detail.data?.result)
                {
                    setAutomateLocation(item_Detail.data.result)
                    let province_name = item_Detail.data.result.address_components.find((adr: any) => adr.types[0] === "administrative_area_level_1")?.long_name
                    let country_name = item_Detail.data.result.address_components.find((adr: any) => adr.types[0] === "country")?.long_name
                    locationString = `${province_name ? province_name + ' ' : ''}${country_name ? country_name : ''}`

                    setOpeningHours(item_Detail?.data?.result?.opening_hours?.weekday_text?.filter((_week: any) => _week.toLowerCase().search('closed') == -1 ).length)
                }
            }
            _defLocationToVisit(params_list.location_id || params_list.place_id ? locationString : params_list.address)
            _defRestaurantsToVisit(params_list.location_id || params_list.place_id ? locationString : params_list.address)
        }
        _defLocation()

    }, [params_list])

    useEffect(() => {
        let _address: any = params.get('address')
        let _location_id: any = params.get('location_id')
        let _place_id: any = params.get('place_id')
        let _v_type: any = params.get('v_type')
        let restaurants: any = params.get('restaurants')
        let start_day_index: any = params.get('start_day_index')
        let days_length: any = params.get('days_length')


        setParamsList({
            address: _address ?? 'USA',
            location_id: _location_id ?? '',
            place_id: _place_id ?? '',
            v_type: _v_type ? _v_type : '',
            restaurants: restaurants ?? '',
            start_day_index: start_day_index ?? '',
            days_length: days_length ?? ''
        })
    }, [params])

    return (
        <div className='overflow-x-hidden w-full'>
            <PageBanner title={automateLocation?.address_components.find((adr: any) => adr.types[0] === "administrative_area_level_1")?.long_name ?? 'Trip Plan'} automateLocation={automateLocation} />
            {
                params_list.address && 
                <TripPlanningCard 
                    params_list={params_list}
                    address={`${params_list.address}`} 
                    totalOpeningHours={openingHours} 
                    automateLocation={automateLocation} 
                    v_type={params_list.v_type}
                />
            }

            {
                (params_list.v_type === "1" || params_list.v_type === "") && automateLocation?.name !== "" &&
                <>
                    <ProductHorizontalSlide 
                        locationsState={locationsState} 
                        url="variation_2" 
                        Title={`${automateLocation?.name ? automateLocation?.name : params_list.address} Location To Visit`} 
                        Description={automateLocation?.location_id ? automateLocation?.description : (automateLocation?.editorial_summary?.overview ?? '')} isAddButton={true} 
                        isDesc={true}
                        v_type={"2"} />
                    <Products title={`Restaurants in ${automateLocation?.name ? automateLocation?.name : params_list.address}`} isAddButton={true} rows="2" />
                </>
            }
            
            {
                automateLocation && <SmallStory positioning="inline" item={automateLocation} />
            }

            <div className=' mt-20'>
                {/* <ClientTestimonials automateLocation={automateLocation} /> */}
                <TripPlanReviews automateLocation={automateLocation} />
            </div>
        </div>
    )
}

export default TripPlan