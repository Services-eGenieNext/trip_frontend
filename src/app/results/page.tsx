"use client";
import {useEffect, useState} from 'react'
import React from "react";
import PageBanner from "@/components/Results/pageBanner";
import Section from "@/components/UIComponents/Section";
import FilterSidebar from "@/components/Results/filterSidebar";
import Lisitngs from "@/components/Results/lisitngs";
import {LocationsCall} from '@/api-calls'
import { useAppSelector } from '@/redux/hooks';

export default function Results() {
  const { surveySlice } = useAppSelector((state) => state.surveyReducer)
  const { locationsState }: any = useAppSelector((state) => state.locationReducer);
  const [locations, setLocations] = useState([])
  useEffect(()=>{
    const locationSearch = async () => {
      let res = await LocationsCall("best locations")
      setLocations(res)
  }
  locationSearch()
  },[])
  useEffect(()=>{
setLocations(locationsState)
  },[locationsState])
  return (
    <div>
      <PageBanner survey={surveySlice} />
      <Section>
        <div className="lg:my-20 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="lg:col-span-1 w-[300px] -z-10">
              <FilterSidebar />
            </div>
            <div className="lg:col-span-3 col-span-4">
              <Lisitngs locations={locations} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
