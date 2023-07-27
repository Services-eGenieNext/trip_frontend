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
        <div className="lg:my-20 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="md:col-span-1">
              <FilterSidebar />
            </div>
            <div className="md:col-span-3">
              <Lisitngs/>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
