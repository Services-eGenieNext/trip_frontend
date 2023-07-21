import React, { useState, useRef, useEffect } from "react";
import DemiData from "@/api/DemiData";
import PricingCard from "./pricingCard";
import TripPlanPopup from "./TripPlanPopup";
import Section from "../UIComponents/Section";
import TripPlanningHeader from "./Header/Header";

export default function TripPlanningCard() {
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

    return (
        <Section>
            <div className="w-full flex justify-center relative">
                <div className="flex flex-col sm-width gilroy">
                    <TripPlanningHeader variation="space-between" />
                    <div className="flex flex-wrap justify-center gap-x-12">
                    {DemiData.PricingPlans &&
                        DemiData.PricingPlans.map((items, index) => {
                        return (
                            <PricingCard variation="cards" key={index} data={items} onOpen={(item) => {
                                setShowTripPopup(true)
                                setItem(item)
                            }} />
                        );
                        })}

                        <TripPlanPopup item={item} show={showTripPopup} onClose={() => {
                            setShowTripPopup(false)
                        }} />
                    </div>
                </div>
            </div>
        </Section>
    );
}
