"use client"
import ClientTestimonials from '@/components/Client-Testimonials/client-testimonials'
import PageBanner from '@/components/PageBanner/PageBanner'
import Products from '@/components/Products/Products'
import SmallStory from '@/components/Story/SmallStory'
import React from 'react'
import TripPlanningCard from '@/components/tripPlanningCard/tripPlanning'
import LocationToVisit from '@/components/Location-To-Visit/LocationToVisit'

const TripPlanPage = () => {
    return (
        <div>
            <PageBanner title='Bali, Indonesia' />
          
            <TripPlanningCard/>

            <LocationToVisit />

            <Products title="Most popular Restaurants" />

            <SmallStory />

            <ClientTestimonials />
        </div>
    )
}

export default TripPlanPage