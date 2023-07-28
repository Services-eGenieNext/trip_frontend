import React, { useEffect, useState } from 'react'
import DemiData from "@/api/DemiData";
import PricingCard from "../pricingCard";
import TripPlanPopup from '../TripPlanPopup';
import location_testing from "./test.json"

const PricingCards = ({locationDetails}: any) => {

    const [showTripPopup, setShowTripPopup] = useState(false);
    const [item, setItem] = useState({});
    const [days, setDays] = useState<any[]>([{day: "Monday", times: [], location: []}])

    useEffect(() => {
        console.log('days', days)
    }, [days])

    useEffect(() => {
        const _locateFunc = async () => {

            let test = await location_testing.map(loc => {
                return {weekdays: loc.hours?.weekday_text.map(weekd => weekd.split(': ')), location_id: loc.location_id}
            })

            let _days: any = []
            for (let index = 0; index < test.length; index++) {
                const weekDays = test[index].weekdays;
                _days.push(weekDays.filter(wd => wd[0] !== _days.day).map(wd => {
                    return {
                        day: wd[0],
                        times: test.map((t: any) => t.weekdays.filter((_wd: any) => _wd[0] == wd[0])),
                        locations: test.filter((t:any) => t.weekdays.filter((_wd: any) => _wd[0] == wd[0]).length > 0).map((t: any) => t.location_id)
                    }
                }))
                
            }
            console.log('_days', _days)
            // let _days = days
            // for (let i = 0; i < location_testing.length; i++) {
            //     let _weekdayTextArr = location_testing[i].hours?.weekday_text ?? null
            //     if(_weekdayTextArr)
            //     {
            //         for (let i = 0; i < _weekdayTextArr.length; i++) {
                        
            //             let weekArr = _weekdayTextArr[i].split(': ')
            //             let dayName = weekArr[0].trim()
            //             let checkFilter = await _days.findIndex(d => d.day === dayName)

            //             let timeinArr = weekArr[1].split(',')
            //             if(checkFilter != -1)
            //             {
            //                 timeinArr = await timeinArr.map(tim => tim.trim())
            //                 _days[checkFilter].times.push(...timeinArr)
            //             }
            //             else {
            //                 _days.push({day: dayName, times: timeinArr})
            //             }
            //         }
            //     }
            // }
            // console.log('_days', _days)
            // setDays(_days)
        }
        _locateFunc()
    }, [])

    return (
        <>
            {
                DemiData.PricingPlans &&
                DemiData.PricingPlans.map((items, index) => {
                    return (
                        <PricingCard isDropdownButton={false} variation="cards" rows = "2" key={index} data={items} onOpen={(item) => {
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