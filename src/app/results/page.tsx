"use client";
import {useEffect, useState} from 'react'
import React from "react";
import PageBanner from "@/components/Results/pageBanner";
import Section from "@/components/UIComponents/Section";
import FilterSidebar from "@/components/Results/filterSidebar";
import Lisitngs from "@/components/Results/lisitngs";
import {LocationsCall} from '@/api-calls'

export default function Results() {
  const [locations, setLocations] = useState([])
  useEffect(()=>{
    const locationSearch = async () => {
      let res = await LocationsCall("best locations")
      console.log('object', res)
      setLocations(res)
  }
  locationSearch()
  },[])
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
              <Lisitngs locations={locations} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
