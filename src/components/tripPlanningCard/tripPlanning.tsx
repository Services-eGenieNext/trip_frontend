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

interface ITripPlanningCard {
    params_list?: any,
    address: string
    totalOpeningHours: number | null
    automateLocation?: any
    v_type?: VariationType
}

export default function TripPlanningCard({params_list, address, totalOpeningHours, automateLocation, v_type=""}: ITripPlanningCard) {
    const skelton = ["1","2","3","4","5","6","7","8"]
    const ref = useRef<HTMLInputElement>(null);
    const [read, setRead] = useState(false);
    const [showTripPopup, setShowTripPopup] = useState(false);
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true)

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

    const setLocationDetailsByAddress = async () => {
        let res = await LocationsCall("places near " + address)
        setLocationDetails([...res])
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
                        let res: any = await DetailsCallByGoogle(_recommendations[index].place_id)
                        if(res.data?.result)
                        {
                            _locationDetails.push(res.data.result)
                        }
                    }
                }
                console.log('_locationDetails', _locationDetails)
                setLocationDetails([..._locationDetails])
                setLoading(false)
            }
        }
        _recomendFunc()
    }, [recommendations])

    useEffect(() => {
        if(address && address!='')
        {
            axios.post(`${PY_API_URL}/get-recommendation`, {input: address}).then(response => {
                setRecommendations(response.data.recommendations)
                if(response.data.recommendations.length == 0)
                {
                    setLocationDetailsByAddress()
                }
            })
        }
    }, [address])

    return (
        <div className="w-full flex justify-center">
        <Section className="relative">
            <div className="w-full flex justify-center relative">
                <div className="flex flex-col sm-width gilroy">
                    <TripPlanningHeader variation="space-between" />
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-12">
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
                                v_type={params_list.v_type}
                            />
                        )
                        }
                    </div>
                </div>
            </div>
        </Section>
        </div>
    );
}
