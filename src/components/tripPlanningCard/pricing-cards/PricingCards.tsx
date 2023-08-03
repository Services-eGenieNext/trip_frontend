import React, { useEffect, useState } from 'react'
import DemiData from "@/api/DemiData";
import PricingCard from "../pricingCard";
import TripPlanPopup from '../TripPlanPopup';
import location_testing from "./test.json"
import TripDetail from '../TripDetail';
import SmallStory from '@/components/Story/SmallStory';
import { VariationType } from '@/interfaces/product';
import ProductHorizontalSlide from '@/components/Products/ProductHorizontalSlide';
import { useAppSelector } from '@/redux/hooks';

interface IPricingCards {
    locationDetails: any
    totalOpeningHours?: number | null
    automateLocation?: any
    v_type?: VariationType
}

const PricingCards = ({locationDetails, totalOpeningHours, automateLocation, v_type}: IPricingCards) => {

    const [LocationDetails, setLocationDetails] = useState<any>([])
    const [showTripPopup, setShowTripPopup] = useState(false);
    const [item, setItem] = useState({});
    const [filteredLocations, setFilteredLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { locationsState } = useAppSelector((state) => state.locationReducer)
    const { restaurantsState }:any = useAppSelector((state) => state.restaurantsReducer)
    
    const [filterDays, setFilterDays] = useState<any[]>([])
    const [localSlots, setLocalSlots] = useState<any[]>([])

    const [days, setDays] = useState<any[]>([
        {
            day: "Monday",
            times: [{
                time: "",
                location: {}
            }],
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
        setFilterDays(days.filter((_day: any) => _day.times.length > 0))
        console.log('filter days',days.filter((_day: any) => _day.times.length > 0))
    }, [days])

    useEffect(() => {

        const timeLoopFunc = async (i:number) => {
            let start = i * 5
            let end = start + 5
            let result: any[] = []
            
            if(LocationDetails.length <= start)
            {
                return result
            }

            result = await LocationDetails?.slice(start, end).map((loc: any) => {
                return (loc.place_id && loc.place_id != "") ? 
                    loc.current_opening_hours?.weekday_text.map((weekd: any) => weekd.split(': ')[1]) :
                    loc.hours?.weekday_text.map((weekd: any) => weekd.split(': ')[1])
            })

            let times = [].concat(...result)
            let uniqueTimes: any[] = [...new Set(times)];
            uniqueTimes = uniqueTimes.map (tim => { return {time: tim, location: null} })
            return uniqueTimes
        }

        const filterLocationByTime = async (time: string) => {
            return await LocationDetails.filter((loc: any) => {
                return (loc.place_id && loc.place_id != "") ? 
                    loc.current_opening_hours?.weekday_text.filter((weekd: any) => {
                        return weekd.split(': ')[1] == time}
                    ) :
                    loc.hours?.weekday_text.filter((weekd: any) => weekd.split(': ')[1] == time)
            })
        }

        const timeLocaitonLoopFunc = async (uniqueTimes: any[], _days: any[], index: number, currentDay: any) => {
            let time: any[] = []
            
            for (let i = 0; i < _days[index].times.length; i++) {
                
                // found same time locations
                let sameTimeLocations = await filterLocationByTime(_days[index].times[i].time)

                // loop upto current loop days
                for(let m = 0; m < sameTimeLocations.length; m++)
                {
                    let found = false;
                    console.log('initial loop time locaiton --------------',sameTimeLocations[m])

                    // check if exist then make "found" variable true
                    for(let j = 0; j <= index; j++)
                    {
                        for(let k = 0; k < _days[j].times.length; k++)
                        {
                            console.log('comparison betwween', _days[j].times[k].location?.name, sameTimeLocations[m].name)
                            if(_days[j].times[k]?.location?.name == sameTimeLocations[m].name)
                            {
                                found = true
                                break
                            }
                        }

                        if(found === true)
                        {
                            break
                        }
                    }

                    // if location not found then add in current time slot i.e. if "found" variable is false
                    if(found === false)
                    {
                        _days[index].times[i].location = sameTimeLocations[m]
                        break
                    }
                }
            }
            return time
        }

        const _loadDays = async () => {
            let _days = days

            for (let i = 0; i < _days.length; i++) {
                
                let time_loop: any = await timeLoopFunc(i)

                _days[i].times = time_loop

                let sort_time_slot = await timeLocaitonLoopFunc(time_loop, _days, i, _days[i])
                // _days[i].locations = await locaitonLoopFunc(i)
            
            }
            setDays([..._days])
            console.log('_days', _days)
            setLoading(false)
        }
        if(LocationDetails.length > 0) {
            _loadDays()
        }

    }, [LocationDetails])

    useEffect(() => {
        const _loadLocations = async () => {
            let locations: any = []
            for (let i = 0; i < days.length; i++) {
                
                let filter_locaiton: any[] = await locationDetails.filter((loc: any) => 
                    (loc.place_id && loc.place_id != "") ? 
                    loc.current_opening_hours?.weekday_text.filter( (weekd: any) => {
                        return weekd.split(': ')[0] == days[i].day && weekd.toLowerCase().search('closed') == -1
                    }) : loc.hours?.weekday_text.filter( (weekd: any) => {
                        return weekd.split(': ')[0] == days[i].day && weekd.toLowerCase().search('closed') == -1
                    })
                )

                locations.push(filter_locaiton)
            }
            locations = [].concat(...locations)
            locations = [...new Set(locations)];
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
            (v_type !== '2' && totalOpeningHours && totalOpeningHours > 4) ? (
                <>
                {
                    (!loading && filterDays) &&
                    filterDays.map((_item, index) => {
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
                    <div className="lg:col-span-1 flex flex-wrap justify-center max-h-[1550px] h-full overflow-auto">
                        {
                        (!loading && filterDays) &&
                        filterDays.map((_item, index) => {
                            return (
                            <PricingCard
                                variation={'list'}
                                isDropdownButton={v_type == "2" ? true : false}
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
                    <div className="lg:col-span-2">
                        <div className="large-shadow sm:p-8 py-8 rounded-xl">
                        <TripDetail item={item} />
                        {
                        v_type !== '2' ? (
                            <SmallStory positioning="block" item={item} />
                        ) : (
                            <>
                            <ProductHorizontalSlide 
                                url = 'variation_2'
                                Title={`${automateLocation?.name} Location To Visit`} 
                                Description={automateLocation?.location_id ? automateLocation?.description : (automateLocation?.editorial_summary?.overview ?? '')} 
                                isAddButton={false} 
                                isDesc={false} 
                                locationsState = {locationsState}
                                slidesToShow={3}
                            />

                            <ProductHorizontalSlide 
                                url = 'variation_2'
                                Title={`Most popular restaurants`} 
                                isAddButton={false} 
                                isDesc={false} 
                                locationsState = {restaurantsState}
                                slidesToShow={3}
                            />
                            </>
                        )
                        }
                        </div>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default PricingCards