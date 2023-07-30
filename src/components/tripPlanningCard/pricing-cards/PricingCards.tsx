import React, { useEffect, useState } from 'react'
import DemiData from "@/api/DemiData";
import PricingCard from "../pricingCard";
import TripPlanPopup from '../TripPlanPopup';
import location_testing from "./test.json"

const PricingCards = ({locationDetails}: any) => {

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


    const _locateFunc = async () => {

        // let test = await location_testing.map(loc => {
        //     return {weekdays: loc.hours?.weekday_text.map(weekd => weekd.split(': ')), location_id: loc.location_id}
        // })

        // let _days: any = []
        // for (let index = 0; index < test.length; index++) {
        //     const weekDays = test[index].weekdays;
        //     _days.push(weekDays.filter(wd => wd[0] !== _days.day).map(wd => {
        //         return {
        //             day: wd[0],
        //             times: test.map((t: any) => t.weekdays.filter((_wd: any) => _wd[0] == wd[0])),
        //             locations: test.filter((t:any) => t.weekdays.filter((_wd: any) => _wd[0] == wd[0]).length > 0).map((t: any) => t.location_id)
        //         }
        //     }))
        // }
        // _days = [].concat(..._days)

        // console.log('_days', _days)
        // setDays(_days)

        let _days = days
        let filter_locaitonArr : any[] = []
        for (let i = 0; i < _days.length; i++)
        {
            let filter_locaiton: any[] = await LocationDetails.filter((loc: any) => 
                (loc.place_id && loc.place_id != "") ? 
                loc.current_opening_hours?.weekday_text.filter( (weekd: any) => {
                    return weekd.split(': ')[0] == _days[i].day && weekd.search('Closed') == -1
                }) : loc.hours?.weekday_text.filter( (weekd: any) => {
                    return weekd.split(': ')[0] == _days[i].day && weekd.search('Closed') == -1
                })
            )
            // console.log('filter_locaiton', filter_locaiton)
            await filter_locaitonArr.concat(filter_locaiton)
            console.log('filter_locaiton', filter_locaitonArr)

            let time_loop: any = filter_locaiton.map(loc => {
                return (loc.place_id && loc.place_id != "") ? 
                    loc.current_opening_hours?.weekday_text.map((weekd: any) => weekd.split(': ')[1]) :
                    loc.hours?.weekday_text.map((weekd: any) => weekd.split(': ')[1])
            })

            let times = [].concat(...time_loop)
            let uniqueTimes = [...new Set(times)];
            _days[i].times = uniqueTimes

            // let location_loop: any = await filter_locaiton.map(loc => loc.location_id)
            // let location_loop_arr = [].concat(...location_loop)
            // let uniqueLocations = [...new Set(location_loop_arr)];

            // _days[i].locations = uniqueLocations
        }
        setDays([..._days])
    }

    useEffect(() => {
        const timeLoopFunc = async (filter_locaiton: any[]) => {
            return await filter_locaiton?.map(loc => {
                return (loc.place_id && loc.place_id != "") ? 
                    loc.current_opening_hours?.weekday_text.map((weekd: any) => weekd.split(': ')[1]) :
                    loc.hours?.weekday_text.map((weekd: any) => weekd.split(': ')[1])
            })
            // for (let i = 0; i < filter_locaiton.length; i++)
            // {

            // }
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

    return (
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
    )
}

export default PricingCards