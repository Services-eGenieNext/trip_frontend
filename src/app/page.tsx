'use client'
import {useState, useEffect} from 'react'
import Hero from '@/components/Hero/hero'
import ActivitiesSlider from '@/components/HomePage/ActivitiesSlider'
import Products from '@/components/HomePage/Resturants'
import LocationSlider from '@/components/HomePage/LocationSlider'
import LocationsCallFromDB  from '@/api-calls/fromDB/location'
import RestaurantsCallFromDB  from '@/api-calls/fromDB/restaurants'
import ActivitiesCallFromDB from '@/api-calls/fromDB/activity'
import HomeReviews from '@/components/HomePage/HomeReviews'
import Occassions from '@/api-calls/fromDB/occassions'
import { setOccasions } from '@/redux/reducers/occasionsSlice'
import { useAppDispatch,useAppSelector } from '@/redux/hooks'
import PriorityValue from '@/api-calls/fromDB/priority'
import { setPriorities } from '@/redux/reducers/prioritySlice'
import TopCountries from '@/api-calls/fromDB/topCountries'
import { setTopCountries } from '@/redux/reducers/topCountries'

export default function Home() {
    const dispatch = useAppDispatch()
    const [location, setLocation] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [activities, setActivities] = useState([])

    useEffect(() => {
        const _def = async () => {
            let res = await LocationsCallFromDB()
            setLocation(res)
        }
        _def()

        const _restaurants = async () => {
            let res = await RestaurantsCallFromDB()
            setRestaurants(res)
        }
        _restaurants()

        const _activities = async () => {
            let res = await ActivitiesCallFromDB()
            setActivities(res)
        }
        _activities()

        const _Occassions = async () => {
            let res = await Occassions()
            dispatch(setOccasions(res))
        }
        _Occassions()

        const _Priorities = async () => {
            let res = await PriorityValue()
            dispatch(setPriorities(res))
        }
        _Priorities()

        const _TopCountries = async () => {
            let res = await TopCountries()
            dispatch(setTopCountries(res))
        }
        _TopCountries()

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


            <HomeReviews locations={[...activities, ...location]} />
        </main>
    )
}
