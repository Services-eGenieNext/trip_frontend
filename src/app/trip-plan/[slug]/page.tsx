"use client"
import ClientTestimonials from '@/components/Client-Testimonials/client-testimonials'
import PageBanner from '@/components/PageBanner/PageBanner'
import Products from '@/components/Products/Products'
import SmallStory from '@/components/Story/SmallStory'
import React from 'react'
import TripPlanningCard from '@/components/tripPlanningCard/tripPlanning'

const TripPlanPage = () => {
    return (
        <div style={{fontFamily: "Gilroy"}}>
        <div>
            <PageBanner title='Bali, Indonesia' />
          
          <TripPlanningCard/>

            <Products title="Most popular Restaurants" />

            <SmallStory />

            <ClientTestimonials />
        </div>
    )
}

export default TripPlanPage