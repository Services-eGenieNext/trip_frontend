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

                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-1 flex flex-wrap justify-center">
                        {
                            DemiData.PricingPlans &&
                            DemiData.PricingPlans.map((items, index) => {
                                return (
                                    <PricingCard isDropdownButton={true} variation="list" rows = "1" key={index} data={items} onOpen={(item) => {}} />
                                )
                            })
                        }
                    </div>
                    <div className="lg:col-span-2 mt-10 ">
                        <div className="large-shadow sm:p-8 py-8 rounded-xl">
                            <TripDetail />

                            <ProductHorizontalSlide 
                                url = 'variation_2'
                                Title='Bali location to visit'
                                Description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'  
                                isAddButton={false} 
                                isDesc={false} 
                            />

                            <ProductHorizontalSlide 
                            url = 'variation_2'
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