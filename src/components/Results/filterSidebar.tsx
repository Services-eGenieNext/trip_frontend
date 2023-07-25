import React from "react";
import FiltersOptions from "./filtersOptions";
import ReviewFilterBox from './reviewFilterBox'
import Filter_option from '@/api/filters'

export default function FilterSidebar() {
  return (
    <div className="px-12">
      <h1 className="text-[30px] font-semibold border-b border-[#E3E3E3] pb-7">
        Filter By
      </h1>
      <FiltersOptions
        filters={Filter_option.popularFilters}
        inputType="checkbox"
        title="Popular Filters"
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
  );
}
