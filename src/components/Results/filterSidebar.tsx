import React, { useState, useEffect } from "react";
import FiltersOptions from "./filtersOptions";
import ReviewFilterBox from './reviewFilterBox'
import Filter_option from '@/api/filters'
import PriceSlider from './priceSlider'
import Occasion from '@/data/occasion.json'
import Activities from '@/data/priority.json'

export default function FilterSidebar({locations,setLocationsData,setLoading}:any) {

  const [showFilter, setShowFilter] = useState(false)
  const [Ranking, setRanking] = useState("")

  useEffect(()=>{
    const filteredArray = locations.filter((list:any)=>{
      return parseInt(Ranking) == Number((list.rating).toFixed())
    })
    console.log(filteredArray,"filteredArray")
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
    <div className={`px-12 fixed inset-0 bg-white z-10  ${showFilter ? '-translate-x-[0%]' : '-translate-x-[100%]'} lg:relative lg:-translate-x-[0%] transition-all duration-300 overflow-y-auto`}>
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
      <h1 className="text-[30px] font-semibold border-b border-[#E3E3E3] pb-7">
        Filter By
      </h1>
      {Activities.length > 0 && (
        <FiltersOptions
        filters={Activities}
        inputType="checkbox"
        title="Activities"
      />
      )}
      <PriceSlider
      title="Price Per Night"
      />
      {Occasion.length > 0 && (
        <FiltersOptions
        filters={Occasion}
        inputType="checkbox"
        title="Occasion"
      />
      )}
      {/* <FiltersOptions
        filters={Filter_option.guestRating}
        inputType="checkbox"
        title="Cuisines"
      /> */}
      <ReviewFilterBox
        filters={Filter_option.propertyClass}
        title="City Ranking"
        type = "review"
        setRanking={setRanking}
      />
      <ReviewFilterBox
        filters={Filter_option.propertyClass}
        title="Activity Ranking"
        type = "review"
        setRanking={setRanking}
      />
    </div>
    </>
  );
}
