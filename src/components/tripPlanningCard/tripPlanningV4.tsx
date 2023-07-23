import React from "react";
import TripPlanningHeader from "./Header/Header";
import PricingCard from "./pricingCard";
import TripDetail from "./TripDetail";
import ProductHorizontalSlide from "../Products/ProductHorizontalSlide";
import Section from "../UIComponents/Section";
import DemiData from "@/api/DemiData";
import SmallStory from "../Story/SmallStory";

export default function TripPlanningV4() {
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
                    variation="list"
                    isDropdownButton={false}
                    rows="1"
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
              <SmallStory positioning="block" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
