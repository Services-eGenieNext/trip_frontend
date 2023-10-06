import React, { useState, useRef, useEffect } from "react";
import TripPlanPopup from "./TripPlanPopup";
import Section from "../UIComponents/Section";
import TripPlanningHeader from "./Header/Header";
import axios from "axios";
import { PY_API_URL } from "@/config/constant";
import DetailsCall, { DetailsCallByGoogle } from "@/api-calls/location-details-call";
import PricingCards from "./pricing-cards/PricingCards";
import Card_skelton from '@/components/UIComponents/card_skelton';
import { VariationType } from "@/interfaces/product";
import { LocationsCall } from "@/api-calls";
import { useAppDispatch } from "@/redux/hooks";
import { reset } from "@/redux/reducers/itinerarySlice";
import Spinloader from "../step-loader/spin-loader";

interface ITripPlanningCard {
    params_list?: any,
    survey: any,
    totalOpeningHours: number | null
    automateLocation?: any
    v_type?: VariationType
}

export default function TripPlanningCard({params_list, survey, totalOpeningHours, automateLocation, v_type=""}: ITripPlanningCard) {
    const skelton = ["1","2","3"]
    const ref = useRef<HTMLInputElement>(null);
    const [read, setRead] = useState(false);
    const [showTripPopup, setShowTripPopup] = useState(false);
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true)
    
    const dispatch = useAppDispatch()

    useEffect(() => {
        const handleClickOutside = (event:any) => {
            if (!ref?.current?.contains(event.target)) {
                setRead(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
    }, [ref]);

    const [recommendations, setRecommendations] = useState<any[]>([])
    const [locationDetails, setLocationDetails] = useState<any[]>([])

    const setLocationDetailsByAddress = async (address: string) => {
        let res = await LocationsCall(`places to visit in ${address ?? params_list.address} for tourist`)
        
        setRecommendations([...res])
    }

    useEffect(() => {
        const _recomendFunc = async () => {
            if(recommendations.length > 0) {
                let _locationDetails: any[] = locationDetails
                let _recommendations = recommendations
                for (let index = 0; index < _recommendations.length; index++) {
                    if(_recommendations[index].location_id && _recommendations[index].location_id !== '')
                    {
                        let res: any = await DetailsCall(_recommendations[index].location_id)
                        if(res.data)
                        {
                            _locationDetails.push(res.data)
                        }
                    }
                    if(_recommendations[index].place_id && _recommendations[index].place_id !== '')
                    {
                        let res: any = await DetailsCallByGoogle(`${_recommendations[index].place_id}&fields=address_components,place_id,name,formatted_address,geometry,current_opening_hours,rating,reviews`)
                        if(res.data?.result)
                        {
                            _locationDetails.push(res.data.result)
                        }
                    }
                }
                
                setLocationDetails([..._locationDetails])
                setLoading(false)
            }
        }
        
        _recomendFunc()
    }, [recommendations])

    useEffect(() => {
        
        const _defLoadRecommendation = async () => {
            let occassion_arr = await survey?.occassion ? survey?.occassion.map((oc: any) => oc.opt) : []
            let priority_arr = await survey?.priority ? survey?.priority.map((pr: any) => pr.opt) : []
            let arr = occassion_arr.concat(...priority_arr)

            let adrArr = params_list.address.split(',')
            let filterAddress = survey.location ? survey.location : (adrArr.length < 2 ? params_list.address : `${adrArr[adrArr.length - 2].trim()}, ${adrArr[adrArr.length - 1].trim()}`)
            axios.post(`${PY_API_URL}/get-recommendation`, {input: filterAddress, types: arr.length > 0 ? arr.join(',') : ''}).then(response => {
                
                dispatch(reset())
                console.log('recommendation', response.data.recommendations)
                if(response.data.recommendations.length == 0)
                {
                    setLocationDetailsByAddress(filterAddress)
                }
                else
                {
                    setRecommendations([...response.data.recommendations])
                }
            })
        }
        if(params_list.address && params_list.address!='')
        {
            _defLoadRecommendation()
        }

    }, [params_list])

    return (
        <Section className="relative mx-auto">
            <div className="w-full flex justify-center relative">
                <div className="flex flex-col sm-width gilroy">
                    <TripPlanningHeader variation="space-between" />
                    <div className="relative">
                        {
                            loading === true && <Spinloader />
                        }
                        {loading === true ? (
                            skelton.map((list:string,index:number)=>{
                                return <Card_skelton key={index}/>
                            })
                        ):(
                            <PricingCards 
                                params_list={params_list}
                                locationDetails={locationDetails} 
                                totalOpeningHours={totalOpeningHours} 
                                automateLocation={automateLocation}
                            />
                        )
                        }
                    </div>
                </div>
            </div>
        </Section>
    );
}
