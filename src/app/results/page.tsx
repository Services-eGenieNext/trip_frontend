"use client";
import { useEffect, useState } from "react";
import React from "react";
import PageBanner from "@/components/Results/pageBanner";
import Section from "@/components/UIComponents/Section";
import FilterSidebar from "@/components/Results/filterSidebar";
import Lisitngs from "@/components/Results/lisitngs";
import LocationsCallFromDB  from '@/api-calls/fromDB/location'
import { useAppSelector } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setLocations } from "@/redux/reducers/locationSlice";
import { setSurveyValue } from "@/redux/reducers/surveySlice";
import Occassions from '@/api-calls/fromDB/occassions'
import { setOccasions } from '@/redux/reducers/occasionsSlice'

export default function Results() {
  const dispatch = useAppDispatch();
  const { surveySlice } = useAppSelector((state) => state.surveyReducer);
  // const { locationsState }: any = useAppSelector(
  //   (state) => state.locationReducer
  // );
  const [locationsState, setLocationState] = useState([])
  const [locationsData, setLocationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearFilter, setClearFilter] = useState(false);

  const _def = async () => {
    setLoading(true);
      let res = await LocationsCallFromDB()
      setLocationState(res)
      setLocationsData(res);
  };

  const _Occassions = async () => {
            let res = await Occassions()
            dispatch(setOccasions(res))
        }
        
  useEffect(()=>{
    _def()
    _Occassions()
  },[])

  useEffect(()=>{
if(clearFilter == true){
  _def()
}
  },[clearFilter])

  useEffect(() => {
    if (clearFilter == true) {
      setClearFilter(false);
      _def();
    }
  }, [clearFilter]);

  return (
    <div>
      <PageBanner survey={surveySlice} />
      <div className="w-full flex justify-center mt-24">
        <div className="relative lg:w-[85%]">
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-4">
            <div className="lg:col-span-1 max-w-[300px] w-full ">
              <FilterSidebar
                setClearFilter={setClearFilter}
                locations={locationsState}
                setLocationsData={setLocationsData}
                setLoading={setLoading}
                clearFilter={clearFilter}
              />
            </div>
            <div className="lg:col-span-3 col-span-4">
              <Lisitngs
                setClearFilter={setClearFilter}
                locations={locationsData}
                loadData={loading}
                setLoadData={setLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
