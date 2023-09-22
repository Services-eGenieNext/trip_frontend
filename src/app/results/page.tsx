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
import PriorityValue from '@/api-calls/fromDB/priority'
import { setPriorities } from '@/redux/reducers/prioritySlice'
import TopCountries from '@/api-calls/fromDB/topCountries'
import { setTopCountries } from '@/redux/reducers/topCountries'
import SearchLocation from '@/api-calls/locations-call'
import TopCities from '@/api-calls/fromDB/topCities'

export default function Results() {
  const dispatch = useAppDispatch();
  const { surveySlice } = useAppSelector((state) => state.surveyReducer);
  const params = useSearchParams()
  const paramsAddress = params.get("address")
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

        const _Priorities = async () => {
          let res = await PriorityValue()
          dispatch(setPriorities(res))
      }

      const _TopCities = async () => {
        let res = await TopCities()
        dispatch(setTopCountries(res))
    }

    const _locationSearch = async () => {
      setLoading(true)
      if(paramsAddress){
        let _occasions = await surveySlice.occassion.map((oc: any) => oc.opt)
        let res = await SearchLocation(`${_occasions ? _occasions.join(',') : 'Best Location'} in ${paramsAddress} for tourist`)
      if(res){
        setLocationState(res)
        setLocationsData(res);
      }
    }
  }

  useEffect(()=>{
if(paramsAddress){
  dispatch(setSurveyValue({...surveySlice, location: paramsAddress}))
  _locationSearch()
}else{
  _def()
}
  },[paramsAddress])

    // useEffect(()=>{
    //   _locationSearch()
    // },[paramsAddress])
        
  useEffect(()=>{
    _Occassions()
    _Priorities()
    _TopCities()
    console.log('surveySlice', surveySlice)
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
