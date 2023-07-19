import ClientTestimonials from '@/components/Client-Testimonials/client-testimonials'
import PageBanner from '@/components/PageBanner/PageBanner'
import Products from '@/components/Products/Products'
import SmallStory from '@/components/Story/SmallStory'
import React from 'react'

const TripPlanPage = () => {
    return (
        <div>
            <PageBanner title='Bali, Indonesia' />

            <Products title="Most popular Restaurants" />

            <SmallStory />

            <ClientTestimonials />
        </div>
    )
}

export default TripPlanPage