import React, { useState, useRef, useEffect } from "react";
import TripPlanPopup from "./TripPlanPopup";
import Section from "../UIComponents/Section";
import TripPlanningHeader from "./Header/Header";
import axios from "axios";
import { PY_API_URL } from "@/config/constant";
import DetailsCall, { DetailsCallByGoogle } from "@/api-calls/location-details-call";
import PricingCards from "./pricing-cards/PricingCards";

export default function TripPlanningCard({address, totalOpeningHours}: {address: string, totalOpeningHours: number | null}) {
    const ref = useRef<HTMLInputElement>(null);
    const [read, setRead] = useState(false);
    const [showTripPopup, setShowTripPopup] = useState(false);
    const [item, setItem] = useState({});

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
                    <div className="flex flex-wrap justify-center gap-x-12">
                        {
                            locationDetails.length > 0 && (
                                <PricingCards locationDetails={locationDetails} totalOpeningHours={totalOpeningHours} />
                            )
                        }
                    </div>
                </div>
            </div>
        </Section>
    );
}
