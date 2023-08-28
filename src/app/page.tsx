'use client'
import {useState, useEffect} from 'react'
import Hero from '@/components/Hero/hero'
import ActivitiesSlider from '@/components/HomePage/ActivitiesSlider'
import Products from '@/components/HomePage/Resturants'
import LocationSlider from '@/components/HomePage/LocationSlider'
import LocationsCallFromDB  from '@/api-calls/fromDB/location'
import RestaurantsCallFromDB  from '@/api-calls/fromDB/restaurants'
import ActivitiesCallFromDB from '@/api-calls/fromDB/activity'

export default function Home() {
    const [location, setLocation] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [activities, setActivities] = useState([])

    useEffect(() => {
        const _def = async () => {
            let res = await LocationsCallFromDB()
            setLocation(res)
            console.log("locations from DB",res)
        }
        _def()

        const _restaurants = async () => {
            let res = await RestaurantsCallFromDB()
            setRestaurants(res)
            console.log("_restaurants from DB",res)
        }
        _restaurants()

        const _activities = async () => {
            let res = await ActivitiesCallFromDB()
            setActivities(res)
            console.log("_activities from DB",res)
        }
        _activities()
    }, [])

    return (
        <main>
            <Hero />

            <LocationSlider 
                Title='Trending Locations' 
                Description='We keep track of what cities are on the rise and which ones are falling so you can always stay ahead of the curve!' 
                isAddButton={false} 
                isDesc={false} 
                locationsState={location} 
                type="title-card"
            />
            
            <ActivitiesSlider activitiesState={activities} />
            <Products title="Top Restaurants In The World" isAddButton={false} rows="2" restaurantsState={restaurants} />
        </main>
    )
}
