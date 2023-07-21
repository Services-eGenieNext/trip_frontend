"use client"

import ClientTestimonials from '@/components/Client-Testimonials/client-testimonials'
import PageBanner from '@/components/PageBanner/PageBanner'
import Products from '@/components/Products/Products'
import SmallStory from '@/components/Story/SmallStory'
import TripPlanningHeader from '@/components/tripPlanningCard/Header/Header'
import React from 'react'
import DemiData from "@/api/DemiData";
import TripPlanningV2 from '@/components/tripPlanningCard/tripPlanningV2'

const TripPlanV2 = () => {
    return (
        <div>
            <PageBanner title='Bali, Indonesia' />

            <TripPlanningV2 />

            <SmallStory />

            <ClientTestimonials />
        </div>
    )
}

export default TripPlanV2