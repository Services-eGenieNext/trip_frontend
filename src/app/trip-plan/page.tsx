"use client"

import ClientTestimonials from '@/components/Client-Testimonials/client-testimonials'
import PageBanner from '@/components/PageBanner/PageBanner'
import ProductHorizontalSlide from '@/components/Products/ProductHorizontalSlide'
import Products from '@/components/Products/Products'
import SmallStory from '@/components/Story/SmallStory'
import TripPlanningCard from '@/components/tripPlanningCard/tripPlanning'
import { useAppSelector } from '@/redux/hooks'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const TripPlan = () => {

    const params = useSearchParams()
    const { locationsState } = useAppSelector((state) => state.locationReducer)
    return (
        <div>
            <PageBanner title='Bali, Indonesia' />
          
            <TripPlanningCard address={`${params.get('address')}`}/>

            <ProductHorizontalSlide locationsState={locationsState} url="variation_2" Title='Bali Location To Visit' Description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet nulla felis. Duis a dolor condimentum, faucibus lacus ac, ullamcorper metus.' isAddButton={true} isDesc={true} />

            <Products title="Most popular Restaurants" isAddButton={true} />

            <SmallStory positioning="inline" />

            <ClientTestimonials />
        </div>
    )
}

export default TripPlan