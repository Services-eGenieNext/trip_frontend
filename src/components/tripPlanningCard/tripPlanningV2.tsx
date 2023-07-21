import React from 'react'
import Section from '../UIComponents/Section'
import TripPlanningHeader from './Header/Header'
import DemiData from "@/api/DemiData";
import PricingCard from './pricingCard';
import TripDetail from './TripDetail';
import ProductHorizontalSlide from '../Products/ProductHorizontalSlide';

const TripPlanningV2 = () => {
    return (
        <Section>
            <div className="my-20">
                <TripPlanningHeader variation="space-arround" />

                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="md:col-span-1">
                        {
                            DemiData.PricingPlans &&
                            DemiData.PricingPlans.map((items, index) => {
                                return (
                                    <PricingCard variation="list" key={index} data={items} onOpen={(item) => {}} />
                                )
                            })
                        }
                    </div>
                    <div className="md:col-span-2 mt-10 ">
                        <div className="large-shadow p-8 rounded-xl">
                            <TripDetail />

                            <ProductHorizontalSlide 
                                Title='Bali location to visit'
                                Description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'  
                                isAddButton={false} 
                                isDesc={false} 
                            />

                            <ProductHorizontalSlide 
                                Title='Most popular restaurants'
                                Description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'  
                                isAddButton={false} 
                                isDesc={false} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default TripPlanningV2