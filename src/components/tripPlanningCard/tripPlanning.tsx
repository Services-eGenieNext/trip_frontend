import React, { useState, useRef, useEffect } from "react";
import TripPlanPopup from "./TripPlanPopup";
import Section from "../UIComponents/Section";
import TripPlanningHeader from "./Header/Header";
import axios from "axios";
import { PY_API_URL } from "@/config/constant";
import DetailsCall from "@/api-calls/location-details-call";
import PricingCards from "./pricing-cards/PricingCards";

export default function TripPlanningCard({address}: {address: string}) {
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
                let _recommendations = await recommendations.filter(recommend => recommend.location_id !== '')
                for (let index = 0; index < _recommendations.length; index++) {
                    let res: any = await DetailsCall(_recommendations[index].location_id)
                    _locationDetails.push(res.data)
                }
                console.log('_locationDetails', _locationDetails)
                setLocationDetails(_locationDetails)
            }
        }
        // _recomendFunc()
    }, [recommendations])

    useEffect(() => {
        axios.post(`${PY_API_URL}/get-recommendation`, {input: address}).then(response => {
            setRecommendations(response.data.recommendations)
            console.log('recommendations', response.data.recommendations)
        })
    }, [address])

    return (
        <Section>
            <div className="w-full flex justify-center relative">
                <div className="flex flex-col sm-width gilroy">
                    <TripPlanningHeader variation="space-between" />
                    <div className="flex flex-wrap justify-center gap-x-12">
                        <PricingCards locationDetails={locationDetails} />
                    </div>
                </div>
            </div>
        </Section>
    );
}
