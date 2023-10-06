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
import { setTopCities } from '@/redux/reducers/topCities'
import AllLocations from '@/api-calls/fromDB/AllLocation'
import { setAllLocations } from '@/redux/reducers/allLocations'

interface ILocationsByFilter {
  type: string,
  locations: any[]
}

export default function Results() {
  const dispatch = useAppDispatch();
  const { surveySlice } = useAppSelector((state) => state.surveyReducer);
  const params = useSearchParams()
  const paramsAddress = params.get("address")
  // const { locationsState }: any = useAppSelector(
  //   (state) => state.locationReducer
  // );
  const [Filteredlocations, setFilteredLocations] = useState<any[]>([]);
  const [locationsData, setLocationsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [clearFilter, setClearFilter] = useState(false);
  const [locationsByFilter, setLocationsByFilter] = useState<ILocationsByFilter[]>([])
  const [occassionLocations, setOccassionLocations] = useState<ILocationsByFilter[]>([])
  const [priorityLocations, setPriorityLocations] = useState<ILocationsByFilter[]>([])

  const _def = async () => {
    setLoading(true);
    let res = await LocationsCallFromDB()
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
    dispatch(setTopCities(res))
}

const _TopCountries = async () => {
    let res = await TopCountries()
    dispatch(setTopCountries(res))
}

const _AllLocation = async () => {
  let res = await AllLocations()
  dispatch(setAllLocations(res))
}

  const _locationSearch = async (address = "") => {
    setLoading(true)
    if(paramsAddress){
      // let _occasions = await surveySlice.occassion.map((oc: any) => oc.opt)
      // let res = await SearchLocation(surveySlice.url ? surveySlice.url : `${_occasions ? _occasions.join(',') : 'Best Location'} in ${paramsAddress} for tourist`)
      let res = await SearchLocation(address ? address : paramsAddress)
      if(res){
        setLocationsData(res);
      }
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(paramsAddress && ((!surveySlice?.occassion || surveySlice?.occassion.length == 0) && (!surveySlice?.priority || surveySlice?.priority.length == 0)) ){
      _locationSearch(`Best Location in ${paramsAddress}`)
    }else if(!surveySlice?.occassion && !surveySlice?.priority){
      _def()
    }
  },[paramsAddress])
        
  useEffect(()=>{
    _Occassions()
    _Priorities()
    _TopCities()
    _TopCountries()
    _AllLocation()
  },[])

  // useEffect(() => {
  //   if (clearFilter == true) {
  //     setClearFilter(false);
  //     // _def();
  //   }
  // }, [clearFilter]);

  useEffect(() => {
    setLoading(true)
    const _defOccassions = async () => {
      let _locationsByFilter = []
      if(surveySlice?.occassion?.length>0)
      {
        setLoading(true)
        setLocationsData([])
        for(let i = 0; i < surveySlice.occassion.length; i++)
        {
          let type = surveySlice.occassion[i].opt
          let check = await _locationsByFilter.findIndex(loc => loc.type === type)
          if(check === -1)
          {
            let res = await SearchLocation(`${surveySlice.occassion[i].opt} in ${surveySlice.location}`)
            _locationsByFilter.push({type: type, locations: res})
          }
        }
        setOccassionLocations(_locationsByFilter)
      }
    }
    _defOccassions()

    const _defPriority = async () => {
      if(surveySlice?.priority?.length>0)
      {
        setLoading(true)
        setLocationsData([])
        let _locationsByFilter = []
        for(let i = 0; i < surveySlice.priority.length; i++)
        {
          let type = surveySlice.priority[i].opt
          let check = await _locationsByFilter.findIndex(loc => loc.type === type)
          if(check === -1)
          {
            let res = await SearchLocation(`${surveySlice.priority[i].opt} in ${surveySlice.location}`)
            _locationsByFilter.push({type: type, locations: res})
          }
        }
        setPriorityLocations(_locationsByFilter)
      }
    }
    _defPriority()
  }, [surveySlice])
  
  useEffect(() => {
    setLocationsByFilter([...locationsByFilter, ...priorityLocations])
  }, [priorityLocations])

  useEffect(() => {
    setLocationsByFilter([...occassionLocations, ...locationsByFilter])
  }, [occassionLocations])

  useEffect(() => {
    setFilteredLocations([...locationsData])
  }, [locationsData])

  return (
    <div>
      <PageBanner survey={surveySlice} />
      <div className="w-full flex justify-center mt-24">
        <div className="relative lg:w-[85%]">
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-4">
              <div className="lg:col-span-1 max-w-[300px] w-full ">
                <FilterSidebar
                  clearFilter={clearFilter}
                  locations={locationsData}
                  setFilteredLocations={setFilteredLocations}
                  locationsByFilter={locationsByFilter}
                  setLoading={setLoading}
                />
              </div>
              <div className="lg:col-span-3 col-span-4">
                <Lisitngs
                  setClearFilter={setClearFilter}
                  locations={locationsData}
                  Filteredlocations={Filteredlocations}
                  setLocations={setLocationsData}
                  locationsByFilter={locationsByFilter}
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
