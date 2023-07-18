'use client'
import Hero from '@/components/Hero/hero'
import Products from '@/components/Products/Products'
import LocationSlider from '@/components/Slider/locationSlider'
import ActivitiesSlider from '@/components/Slider/activitiesSlider'

export default function Home() {
    return (
        <main>
            <Hero />
            <LocationSlider/>
            <ActivitiesSlider/>
            <Products />
        </main>
    )
}
