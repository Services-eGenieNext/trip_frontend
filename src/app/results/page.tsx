"use client";
import React from "react";
import PageBanner from "@/components/Results/pageBanner";
import Section from "@/components/UIComponents/Section";
import FilterSidebar from "@/components/Results/filterSidebar";
import Lisitngs from "@/components/Results/lisitngs";

export default function Results() {
  return (
    <div>
      <PageBanner />
      <Section>
        <div className="my-20">
          <div className="grid grid-cols-4">
            <div className="col-span-1">
              <FilterSidebar />
            </div>
            <div className="col-span-3">
              <Lisitngs/>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
