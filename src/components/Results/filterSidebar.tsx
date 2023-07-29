import React, { useState } from "react";
import FiltersOptions from "./filtersOptions";
import ReviewFilterBox from './reviewFilterBox'
import Filter_option from '@/api/filters'
import PriceSlider from './priceSlider'

export default function FilterSidebar() {

  const [showFilter, setShowFilter] = useState(false)

  return (
    <>
      <span className="lg:hidden fixed left-0 top-1/2 translate-y-[-50%] flex justify-center items-center text-white w-[40px] h-[40px] bg-[#009ee2] rounded-r-lg z-10 "
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
      <FiltersOptions
        filters={Filter_option.popularFilters}
        inputType="checkbox"
        title="Popular Filters"
      />
      <PriceSlider
      title="Price Per Night"
      />
      <FiltersOptions
        filters={Filter_option.guestRating}
        inputType="radio"
        title="Guest Rating"
      />
      <ReviewFilterBox
        filters={Filter_option.propertyClass}
        title="Property Class"
        type = "review"
      />
      <FiltersOptions
        filters={Filter_option.paymentType}
        inputType="checkbox"
        title="Payment Type"
      />
      <FiltersOptions
        filters={Filter_option.roomType}
        inputType="checkbox"
        title="Room Type"
      />
      <ReviewFilterBox
        filters={Filter_option.holidayRentalBedrooms}
        title="Holiday Rental Bedrooms"
        type = "holidayRentalBedrooms"
      />
      <FiltersOptions
        filters={Filter_option.area}
        inputType="checkbox"
        title="Area"
      />
      <FiltersOptions
        filters={Filter_option.popularLocations}
        inputType="checkbox"
        title="Popular Location"
      />
      <FiltersOptions
        filters={Filter_option.mealPlansAvailable}
        inputType="checkbox"
        title="Meal plans available"
      />
      <FiltersOptions
        filters={Filter_option.amenities}
        inputType="checkbox"
        title="Amenities"
      />
    </div>
    </>
  );
}
