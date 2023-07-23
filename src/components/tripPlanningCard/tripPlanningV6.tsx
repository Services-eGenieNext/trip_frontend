import React from "react";
import Section from "../UIComponents/Section";
import TripPlanningHeader from "./Header/Header";
import PricingCard from "./pricingCard";
import DemiData from "@/api/DemiData";
import TripDetail from "./TripDetail";
import ProductHorizontalSlide from "../Products/ProductHorizontalSlide";
import Products from "../Products/Products";


export default function TripPlanningV6() {
  return (
    <Section>
      <div className="my-20">
        <TripPlanningHeader variation="space-arround" />
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-1">
            {DemiData.PricingPlans &&
              DemiData.PricingPlans.map((items, index) => {
                return (
                  <PricingCard
                    variation="cards"
                    isDropdownButton={false}
                    rows = "1"
                    key={index}
                    data={items}
                    onOpen={(item) => {}}
                  />
                );
              })}
          </div>
          <div className="md:col-span-2 mt-10 ">
                        <div className="large-shadow p-8 rounded-xl">
                            <TripDetail />

                            <ProductHorizontalSlide 
                            url = 'variation_3'
                                Title='Bali location to visit'
                                Description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'  
                                isAddButton={false} 
                                isDesc={false} 
                            />

<Products title="Most popular Restaurants" isAddButton={false} />
                        </div>
                    </div>
        </div>
      </div>
    </Section>
  );
}
