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

interface ITripPlanningCard {
    address: string
    totalOpeningHours: number | null
    automateLocation?: any
    v_type?: VariationType
}

export default function TripPlanningCard({address, totalOpeningHours, automateLocation, v_type=""}: ITripPlanningCard) {
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

    useEffect(() => {
        const _recomendFunc = async () => {
            if(recommendations.length > 0) {
                let _locationDetails: any[] = locationDetails
                let _recommendations = recommendations.slice(0, 4)
                for (let index = 0; index < _recommendations.length; index++) {
                    if(_recommendations[index].location_id && _recommendations[index].location_id !== '')
                    {
                        let res: any = await DetailsCall(_recommendations[index].location_id)
                        _locationDetails.push(res.data)
                    }
                    if(_recommendations[index].place_id && _recommendations[index].place_id !== '')
                    {
                        let res: any = await DetailsCallByGoogle(_recommendations[index].place_id)
                        _locationDetails.push(res.data.result)
                    }
                }
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
            })
        }
    }, [address])

    return (
        <Section>
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
                                locationDetails={locationDetails} 
                                totalOpeningHours={totalOpeningHours} 
                                automateLocation={automateLocation}
                                v_type={v_type}
                            />
                        )
                        }
                    </div>
                </div>
            </div>
        </Section>
    );
}
