import React, { useState, useEffect } from "react";
import ReviewFilterBox from './reviewFilterBox'
import Filter_option from '@/api/filters'
import PriceSlider from './priceSlider'
import Occasion from '@/data/occasion.json'
import Activities from '@/data/priority.json'
import CardOptionsSearchListing from './filtersOptionsSearch'

export default function FilterSidebar({locations,setLocationsData,setClearFilter,clearFilter}:any) {

  const [locationArray,setLocationArray] = useState([])

  const [showFilter, setShowFilter] = useState(false)
  const [Ranking, setRanking] = useState("")
useEffect(()=>{
  setLocationArray(locations)
},[locations])
  useEffect(()=>{
    const filteredArray = locationArray.filter((list:any)=>{
      return parseInt(Ranking) == Math.floor(list?.details?.rating)
    })
    setLocationsData(filteredArray)
  },[Ranking])

  return (
    <>
      <span className="lg:hidden fixed left-0 top-1/2 translate-y-[-50%] flex justify-center items-center text-white w-[40px] h-[40px] bg-[#009ee2] rounded-r-lg  "
            onClick={() => setShowFilter(!showFilter)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
        </span>
    <div className={`px-12 fixed inset-0 lg:z-10 z-30 bg-white ${showFilter ? '-translate-x-[0%]' : '-translate-x-[100%]'} lg:relative lg:-translate-x-[0%] transition-all duration-300 overflow-y-auto`}>
      <span
        className="absolute top-2 right-2 lg:hidden"
        onClick={() => setShowFilter(!showFilter)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
      <div className="border-b border-[#E3E3E3] pb-3">
      <h1 className="text-[30px] font-semibold ">
        Filter By
      </h1>
      <p className="text-[#009de2] mt-4 text-end cursor-pointer" onClick={()=>{
        setRanking("")
        setClearFilter(true)
        }}>Clear All</p>
      </div>
      {Activities.length > 0 && (
        <CardOptionsSearchListing
        title="Activities"
        categories={Activities}
        // onChange={handleRetailer}
        clearData={clearFilter}
        // selectedData={selectedRetailer}
      />
      )}
      <PriceSlider
      title="Price Per Night"
      clearData={clearFilter}
      />
      {Occasion.length > 0 && (
        <CardOptionsSearchListing
        title="Occasion"
        categories={Occasion}
        // onChange={handleRetailer}
        clearData={clearFilter}
        // selectedData={selectedRetailer}
      />
      )}
      <ReviewFilterBox
        filters={Filter_option.cityRanking}
        title="City Ranking"
        type = "review"
        setRanking={setRanking}
        clearFilter={clearFilter}
      />
      <ReviewFilterBox
        filters={Filter_option.activityRanking}
        title="Activity Ranking"
        type = "review"
        setRanking={setRanking}
        clearFilter={clearFilter}
      />
    </div>
    </>
  );
}
