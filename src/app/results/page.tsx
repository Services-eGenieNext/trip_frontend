"use client";
import { useEffect, useState } from "react";
import React from "react";
import PageBanner from "@/components/Results/pageBanner";
import Section from "@/components/UIComponents/Section";
import FilterSidebar from "@/components/Results/filterSidebar";
import Lisitngs from "@/components/Results/lisitngs";
import { LocationsCall } from "@/api-calls";
import { useAppSelector } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setLocations } from "@/redux/reducers/locationSlice";
import { setSurveyValue } from "@/redux/reducers/surveySlice";

export default function Results() {
  const dispatch = useAppDispatch();
  const { surveySlice } = useAppSelector((state) => state.surveyReducer);
  const { locationsState }: any = useAppSelector(
    (state) => state.locationReducer
  );
  const [locationsData, setLocationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useSearchParams();
  const paramsAddress = params.get("address");
  const [clearFilter, setClearFilter] = useState(false);

  const _def = async (paramsAddress: any) => {
    setLoading(true);
    if (paramsAddress) {
      let res = await LocationsCall(
        `best places for visit in ${paramsAddress} for tourist`
      );
      dispatch(setLocations(res));
      setLocationsData(res);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (paramsAddress) {
      dispatch(setSurveyValue({ ...surveySlice, location: paramsAddress }));
      _def(paramsAddress);
    } else {
      _def("USA");
    }
  }, [paramsAddress]);

  useEffect(() => {
    if (clearFilter == true) {
      setClearFilter(false);
      setLocationsData(locationsState);
    }
  }, [clearFilter]);

  return (
    <div>
      <PageBanner survey={surveySlice} />
      <Section>
        <div className="lg:my-20 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="lg:col-span-1 w-[300px] ">
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
      </Section>
    </div>
  );
}
