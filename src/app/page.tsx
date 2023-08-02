'use client'
import Hero from '@/components/Hero/hero'
import Products from '@/components/Products/Products'
import LocationSlider from '@/components/Slider/locationSlider'
import ActivitiesSlider from '@/components/Slider/activitiesSlider'
import ProductHorizontalSlide from '@/components/Products/ProductHorizontalSlide'
import { useAppSelector } from '@/redux/hooks'

export default function Home() {

    const { locationsState }: any = useAppSelector((state) => state.locationReducer);

    return (
        <main>
            <Hero />

            {/* <LocationSlider/> */}

            <ProductHorizontalSlide 
                Title='Trending Locations' 
                Description='We keep track of what cities are on the rise and which ones are
                falling so you can stress less and focus more on living your best
                vacation life!' 
                isAddButton={false} 
                isDesc={false} 
                locationsState={locationsState} 
                type="title-card"
            />
            
            <ActivitiesSlider/>
            
            <Products title="Top Restaurants In The World" isAddButton={false} rows="2" />
        </main>
    )
}
