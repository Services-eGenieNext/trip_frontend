import React, { useEffect, useState } from 'react'
import DemiData from "@/api/DemiData";
import PricingCard from "../pricingCard";
import TripPlanPopup from '../TripPlanPopup';
import location_testing from "./test.json"
import TripDetail from '../TripDetail';
import SmallStory from '@/components/Story/SmallStory';

interface IPricingCards {
    locationDetails: any
    totalOpeningHours?: number | null
    automateLocation?: any
}

const PricingCards = ({locationDetails, totalOpeningHours, automateLocation}: IPricingCards) => {

    const [LocationDetails, setLocationDetails] = useState<any>([])
    const [showTripPopup, setShowTripPopup] = useState(false);
    const [item, setItem] = useState({});
    const [filteredLocations, setFilteredLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [days, setDays] = useState<any[]>([
        {
            day: "Monday",
            times: [],
            locations: []
        },
        {
            day: "Tuesday",
            times: [],
            locations: []
        },
        {
            day: "Wednesday",
            times: [],
            locations: []
        },
        {
            day: "Thursday",
            times: [],
            locations: []
        },
        {
            day: "Friday",
            times: [],
            locations: []
        },
        {
            day: "Saturday",
            times: [],
            locations: []
        },
        {
            day: "Sunday",
            times: [],
            locations: []
        }
    ])

    useEffect(() => {

        const timeLoopFunc = async (filter_locaiton: any[]) => {
            return await filter_locaiton?.map(loc => {
                return (loc.place_id && loc.place_id != "") ? 
                    loc.current_opening_hours?.weekday_text.map((weekd: any) => weekd.split(': ')[1]) :
                    loc.hours?.weekday_text.map((weekd: any) => weekd.split(': ')[1])
            })
        }
        const _loadDays = async () => {
            let _days = days
            for (let i = 0; i < _days.length; i++) {
                
                let time_loop: any = await timeLoopFunc(LocationDetails[i])
                
                let times = [].concat(...time_loop)
                let uniqueTimes = [...new Set(times)];
                _days[i].times = uniqueTimes
                _days[i].locations = LocationDetails[i]
            
            }
            setDays(_days)
            setLoading(false)
        }
        if(LocationDetails.length > 0) {
            _loadDays()
        }

    }, [LocationDetails])

    useEffect(() => {
        const _loadLocations = async () => {
            let locations = []
            for (let i = 0; i < days.length; i++) {
                
                let filter_locaiton: any[] = await locationDetails.filter((loc: any) => 
                    (loc.place_id && loc.place_id != "") ? 
                    loc.current_opening_hours?.weekday_text.filter( (weekd: any) => {
                        return weekd.split(': ')[0] == days[i].day && weekd.search('Closed') == -1
                    }) : loc.hours?.weekday_text.filter( (weekd: any) => {
                        return weekd.split(': ')[0] == days[i].day && weekd.search('Closed') == -1
                    })
                )

                locations.push(filter_locaiton)
            }
            setLocationDetails(locations)
        }
        _loadLocations()
    }, [locationDetails])

    useEffect(() => {
        setItem({...automateLocation})
    }, [automateLocation])

    return (
        <>
        {
            totalOpeningHours && totalOpeningHours > 4 ? (
                <>
                {
                    (!loading && days) &&
                    days.map((_item, index) => {
                        return (
                            <PricingCard key={index} 
                            isDropdownButton={false} 
                            variation="cards" 
                            rows = "2" 
                            filteredLocations={filteredLocations} 
                            data={_item} 
                            onOpen={(item) => {
                                setShowTripPopup(true)
                                setItem(item)
                            }} />
                        );
                    })
                }

                <TripPlanPopup item={item} show={showTripPopup} onClose={() => {
                    setShowTripPopup(false)
                }} />
                </>       
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-1 flex flex-wrap justify-center">
                        {
                        (!loading && days) &&
                        days.map((_item, index) => {
                            return (
                            <PricingCard
                                variation="list"
                                isDropdownButton={false}
                                rows="1"
                                key={index}
                                data={_item}
                                onOpen={(item) => {
                                    setItem(item)
                                }}
                            />
                            );
                        })}
                    </div>
                    <div className="lg:col-span-2 mt-10 ">
                        <div className="large-shadow sm:p-8 py-8 rounded-xl">
                        <TripDetail item={item} />
                        <SmallStory positioning="block" item={item} />
                        </div>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default PricingCards