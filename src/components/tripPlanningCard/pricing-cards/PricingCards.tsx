import React, { useEffect, useState } from 'react'
import DemiData from "@/api/DemiData";
import PricingCard from "../pricingCard";
import TripPlanPopup from '../TripPlanPopup';
import location_testing from "./test.json"
import TripDetail from '../TripDetail';
import SmallStory from '@/components/Story/SmallStory';
import { VariationType } from '@/interfaces/product';
import ProductHorizontalSlide from '@/components/Products/ProductHorizontalSlide';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import styles from "./pricing-cards.module.css"
import { setItineraryDays } from '@/redux/reducers/itinerarySlice';
import { IDays } from '@/interfaces';
import { _calculateStartAndEndTime } from './functions';
import Card_skelton from '@/components/UIComponents/card_skelton';

interface IPricingCards {
    params_list?: any
    locationDetails: any
    totalOpeningHours?: number | null
    automateLocation?: any
    v_type?: VariationType
}

const PricingCards = ({params_list, locationDetails, totalOpeningHours, automateLocation, v_type}: IPricingCards) => {

    const [LocationDetails, setLocationDetails] = useState<any>([])
    const [showTripPopup, setShowTripPopup] = useState(false);
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState<boolean>(true);
    const { locationsState } = useAppSelector((state) => state.locationReducer)
    const { restaurantsState }:any = useAppSelector((state) => state.restaurantsReducer)
    const { itineraryDays, itineraryLoading } = useAppSelector((state) => state.itineraryReducer)

    const daysLength = Number(params_list.days_length) ?? 7
    const daysLengtArr = new Array(daysLength).fill(null)
    const dispatch = useAppDispatch()
    const [days, setDays] = useState<any[]>([
        {
            day: "Monday",
            times: []
        },
        {
            day: "Tuesday",
            times: []
        },
        {
            day: "Wednesday",
            times: []
        },
        {
            day: "Thursday",
            times: []
        },
        {
            day: "Friday",
            times: []
        },
        {
            day: "Saturday",
            times: []
        },
        {
            day: "Sunday",
            times: []
        }
    ])
    console.log('daysLength', daysLength, params_list.days_length)

    const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

    // useEffect(() => {
        
    //     console.log('localdays', _localDays, daysLength)
    //     setDays(_localDays)
    // }, [params_list])

    useEffect(() => {

        // dispatch(setItineraryDays(days.filter((_day: any) => _day.times.length > 0)))

        const _defDays = async () => {
            let _days = []
            for (let i = 0; i < days.length; i++) {
                _days.push({...days[i]})
                if(_days[i].times.length > 0)
                {
                    for (let j = 0; j < _days[i].times.length; j++) {
                        _days[i].times = [..._days[i].times]
                        
                        let _times = [..._days[i].times]

                        let suggestedTime = await _calculateStartAndEndTime(_times, j)
                        
                        _days[i].times[j] = {..._times[j], suggestedTime: suggestedTime}

                    }
                }
            }
            console.log('_days', _days)
            dispatch(setItineraryDays( [..._days.filter((_day: any) => _day.times.length > 0)] ))
        }
        _defDays()
    }, [days])

    useEffect(() => {

        const timeLoopFunc = async (i:number) => {
            let start = i * 3
            let end = start + 3
            let result: any[] = []
            
            if(LocationDetails.length <= start)
            {
                return result
            }

            result = await LocationDetails?.slice(start, end).map((loc: any) => {
                return (loc.place_id && loc.place_id != "") ? 
                    loc.current_opening_hours?.weekday_text.filter((_weekd: any) => _weekd.split(': ')[1].toLowerCase().search('closed') == -1 ).map((weekd: any) => weekd.split(': ')[1]) :
                    loc.hours?.weekday_text.filter((_weekd: any) => _weekd.split(': ')[1].toLowerCase().search('closed') == -1 ).map((weekd: any) => weekd.split(': ')[1])
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

        const timeLocaitonLoopFunc = async (_days: any[], index: number) => {
            let time: any[] = []
            
            for (let i = 0; i < _days[index].times.length; i++) {
                
                // found same time locations
                let sameTimeLocations = await filterLocationByTime(_days[index].times[i].time)

                let availableLocation = false
                // loop upto current loop days
                
                for(let m = 0; m < sameTimeLocations.length; m++)
                {
                    let found = false;

                    // check if exist then make "found" variable true
                    for(let j = 0; j <= index; j++)
                    {
                        for(let k = 0; k < _days[j].times.length; k++)
                        {
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
                        
                        availableLocation = true
                        break
                    }
                }

                if(availableLocation == false)
                {
                    _days[index].times[i].location = sameTimeLocations[random(0, sameTimeLocations.length-1)]
                }

            }
            return time
        }

        let _localDays: any[] = []
        let startIndex = params_list.start_day_index
        let _daysLength = daysLengtArr.length > 0 ? daysLengtArr.length : days.length

        for (let index = 0; index < _daysLength; index++) {
            if(daysLength !== 0 && daysLength < 7)
            {
                let dayIndex = ((startIndex-1)+index) % 7
                
                _localDays.push({...days[dayIndex]})
            }
            else
            {
                _localDays.push({...days[index]})
            }
        }

        console.log('------------ _localDays', _localDays)

        const _loadDays = async () => {
            let _days = _localDays

            for (let i = 0; i < _days.length; i++) {
                
                let time_loop: any[] = await timeLoopFunc(i)

                _days[i] = {..._days[i], times: time_loop}

                await timeLocaitonLoopFunc(_days, i)
            
            }
            setDays([..._days])

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
                    loc.current_opening_hours?.weekday_text || loc?.hours?.weekday_text ?
                    (typeof loc?.place_id !== undefined && loc?.place_id && loc?.place_id != "") ? 
                    loc.current_opening_hours?.weekday_text.filter( (weekd: any) => {
                        return weekd.split(': ')[0] == days[i].day && weekd.toLowerCase().search('closed') == -1
                    }) : loc?.hours?.weekday_text.filter( (weekd: any) => {
                        return weekd.split(': ')[0] == days[i].day && weekd.toLowerCase().search('closed') == -1
                    }) : false
                )

                locations.push(filter_locaiton)
            }
            locations = [].concat(...locations)
            locations = [...new Set(locations)];
            setLocationDetails([...locations])
        }
        console.log('locationDetails', locationDetails)
        _loadLocations()
    }, [locationDetails])

    useEffect(() => {
        setItem(automateLocation ? {...automateLocation} : {...itineraryDays[0].times[0].location})
    }, [automateLocation])

    const skelton = ["1","2","3","4","5","6","7","8"]
    
    return (
        <>
        {
            itineraryLoading ? 
            skelton.map((list:string,index:number)=>{
                return <Card_skelton key={index}/>
            }) : (
                v_type !== '2' && itineraryDays && itineraryDays.length > 4) ? (
                    <>
                    {
                        (!loading && itineraryDays) &&
                        itineraryDays.map((_item, index) => {
                            return (
                                <PricingCard key={index} 
                                isDropdownButton={false} 
                                variation="cards" 
                                rows = "2"
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
                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-3 ${styles.tripPlanning}`}>
                    <div className={`lg:col-span-1 flex flex-wrap justify-center max-h-[1550px] h-full overflow-auto`}>
                        {
                        (!loading && itineraryDays) &&
                        itineraryDays.map((_item, index) => {
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