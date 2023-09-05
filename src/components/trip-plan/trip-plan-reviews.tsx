import React, { useEffect, useState } from "react";
import ComponentTitle from "../UIComponents/ComponentTitle";
import { BlankStar, FilledStar } from "../icons/Stars";
import BlueButton from "../UIComponents/Buttons/BlueButton";
import styles from "./client-testimonials.module.css";
// import Modal from "../Modal/index";
import { ReviewsCall } from "@/api-calls";
import { useAppSelector } from "@/redux/hooks";
import Section from "../UIComponents/Section";
import Image from "next/image";
import ReviewFilterBox from "../Results/reviewFilterBox";
import SelectField from "../UIComponents/InputField/SelectField";
import Reviews from "../reviews/reviews";

interface IReviews {
  automateLocation?: any
  locations: any[]
}
const TripPlanReviews = ({ automateLocation, locations }:IReviews) => {
    
    const [loading, setLoading] = useState(true);
    const [reviewsData, setReviewsData] = useState<any[] | null>(null);

    const { itineraryDays } = useAppSelector((state) => state.itineraryReducer);
    const [openModal, setOpenModal] = useState(false);
    const [showReviews, setShowReviews] = useState(true)
    const [showFilter, setShowFilter] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState<any>({})
    const [locaitonList, setLocationList] = useState<any[]>([])
    const [locaitonOptions, setLocationOptions] = useState<any[]>([])
    const [inSchedule, setInSchedule] = useState<boolean | null>(null)
    const [filterData, setFilterData] = useState({
        locationIndex: "",
        reviews: "All",
    })

    // use Effect for Location and Reviews Filter
    useEffect(() => {
        
        const _defFilter = () => {
            let _selectedLocation = selectedLocation
            if(filterData.locationIndex !== "")
            {
                let index = locaitonList.findIndex(opt => opt.name === filterData.locationIndex)
                _selectedLocation = locaitonList[Number(index)]
                setSelectedLocation(_selectedLocation)
            }
        }
        
        _defFilter()

    }, [filterData]);

    // use Effect for In Schedule Filter
    useEffect(() => {

        const _defInSchedule = async () => {
            let isExistLocArr: any[] = itineraryDays.map(itinerary => itinerary.times.map(time => time.location))
            let itineraryLocations: any[] = [].concat(...isExistLocArr)
            let inScheduleLocations
            if(inSchedule == true)
            {
                inScheduleLocations = await locaitonList.filter(loc => itineraryLocations.filter(itineraryLoc => itineraryLoc.name === loc.name).length > 0)
            }
            else if(inSchedule == false)
            {
                inScheduleLocations = await locaitonList.filter(loc => itineraryLocations.filter(itineraryLoc => itineraryLoc.name === loc.name).length == 0)
            }
            inScheduleLocations = [...new Set(inScheduleLocations)]

            let _list = await inScheduleLocations.map((loc: any, index) => {
                return {
                    id: index+1,
                    name: loc.name
                }
            })

            setLocationOptions([..._list])
            
            

            if(inScheduleLocations.length > 0)
            {
                setSelectedLocation(inScheduleLocations[0])
                setFilterData({
                    locationIndex: inScheduleLocations[0].name,
                    reviews: "All",
                })
                // let reviews = await inScheduleLocations[0].reviews === undefined ? [] : (filterData.reviews !== "All" ? inScheduleLocations[0].reviews.filter((review: any) => review.rating === Number(filterData.reviews)) : inScheduleLocations[0].reviews)
            }
            else
            {
                setSelectedLocation({})
                setFilterData({
                    locationIndex: '',
                    reviews: "All",
                })
            }
        }
        
        _defInSchedule()
    }, [inSchedule])

    useEffect(() => {
        const _locationOptionFunc = async () => {
            if(locaitonList.length > 0)
            {
                setSelectedLocation(locaitonList[0])
                // setReviewsData(locaitonList[0].reviews === undefined ? [] : (filterData.reviews !== "All" ? locaitonList[0].reviews.filter((review: any) => review.rating === Number(filterData.reviews)) : locaitonList[0].reviews));

                let _list = await locaitonList.map((loc: any, index) => {
                return {
                    id: index+1,
                    name: loc.name
                }
                })
                setLocationOptions([..._list])
            }
        }

        _locationOptionFunc()
    }, [locaitonList])

    useEffect(() => {
        
        const _def = async () => {
            let _locations = await itineraryDays.map((itin: any) => 
            itin.times.map((time: any) => 
                time.location 
            )
            )
            _locations = await [].concat(..._locations)
            
            _locations = _locations.concat(...locations)
            _locations = [...new Set(_locations)]

            setLocationList([..._locations])
        }
        _def()

    }, [itineraryDays])

    useEffect(() => {
        
        if (reviewsData!=null) {
            setLoading(false);
        }

    }, [reviewsData]);

    useEffect(() => {
        setSelectedLocation(automateLocation ? {...automateLocation} : (locaitonList.length > 0 ? {...locaitonList[0]} : null))
    }, [automateLocation, locaitonList]);

    useEffect(() => {

        setReviewsData(selectedLocation?.reviews === undefined ? [] : (filterData.reviews !== "All" ? selectedLocation.reviews.filter((review: any) => review.rating === Number(filterData.reviews)) : selectedLocation.reviews));
    
    }, [selectedLocation])

    const reviewArr = new Array(5).fill(1);

    const reviewOptions = [
        {
        id: 'All', name: "All"
        },
        {
        id: 1, name: 1
        },
        {
        id: 2, name: 2
        },
        {
        id: 3, name: 3
        },
        {
        id: 4, name: 4
        },
        {
        id: 5, name: 5
        }
    ]

    return (
        <div className="w-full flex justify-center">
            <Section className="relative">
                <div className="sm-width sm:px-4 px-0">
                    <div className="flex flex-wrap sm:justify-between justify-center items-center">
                        <div>
                            <ComponentTitle title="Client's Reviews" />
                            <span className="flex flex-wrap gap-2 items-center mt-3">
                                {reviewArr &&
                                reviewArr.map((review, index) => {
                                    if (index < Math.floor(selectedLocation?.rating)) {
                                    return <FilledStar key={index} />;
                                    } else {
                                    return <BlankStar key={index} />;
                                    }
                                })}
                                {selectedLocation?.rating} Reviews
                            </span>
                        </div>
                        <div className="relative"
                        onClick={() => {
                            setOpenModal(!openModal);
                        }}
                        >
                            <BlueButton onClick={() => setShowFilter(!showFilter)} title={"Filter Reviews"} />
                        </div>
                    </div>
                    <div id="rating-filter" className={`transition-all duration-300 ${!openModal ? 'overflow-hidden' : 'pt-8'}`} style={{height: openModal ? window.innerWidth < 768 ? "200px" : "74px" : "0px"}}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <SelectField
                            label="Locations"
                            placeholder="Select ..."
                            data={locaitonOptions}
                            className={`sm:mr-2 sm:my-2 my-5 w-full`}
                            value={filterData.locationIndex}
                            onChange={async (val) =>{
                            setFilterData({...filterData, locationIndex: val})}
                            }
                            />

                            <SelectField
                            label="Reviews"
                            placeholder="Select ..."
                            data={reviewOptions}
                            className={`sm:mr-2 sm:my-2 my-5 w-full`}
                            value={filterData.reviews}
                            onChange={(val) =>
                            setFilterData({...filterData, reviews: val})
                            }
                            />

                            {/* <SelectField
                                label="Reviews"
                                placeholder="Select ..."
                                data={[
                                    {id: "In-Schedule", name: "In-Schedule"},
                                    {id: "Not In-Schedule", name: "Not In-Schedule"}
                                ]}
                                className={`sm:mr-2 sm:my-2 my-5 w-full`}
                                value={inSchedule ? "In-Schedule" : "Not In-Schedule"}
                                onChange={(val) =>
                                setInSchedule(val == 'In-Schedule' ? true : false)
                            }
                            /> */}

                            <div className="flex items-center">
                                <label htmlFor="in-schedule">
                                    <input type="checkbox" name="in-schedule" id="in-schedule" checked={inSchedule ? true : false} onChange={() => setInSchedule(!inSchedule)} /> In Schedule
                                </label>
                            </div>
                        </div>
                    </div>

                    <Reviews show={showReviews} loading={loading} data={reviewsData} />
                    
                    {
                        reviewsData!=null && reviewsData.length > 0 && (
                        <div className="mt-20 flex justify-center">
                            <button className="w-[150px] border-[var(--blue)] bg-[var(--blue)] text-white py-2 rounded-md" onClick={()=>{setShowReviews(!showReviews)}}>{showReviews == true ? "Hide Reviews" : "Read Reviews"}</button>
                        </div>
                        )
                    }

                    {/* {
                        showReviews === true ? (
                        <div className="my-10 md:my-20">
                            {loading === true
                            ? skelton.map((show: any, index: number) => {
                                return (
                                    <div
                                    key={index}
                                    role="status"
                                    className="w-full animate-pulse p-8 my-10 shadow rounded-xl"
                                    >
                                        <div className="flex flex-wrap justify-between items-center mb-4">
                                        <div className="h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 w-[300px] mb-4"></div>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    </div>
                                    <div className="flex items-center mt-4 space-x-3">
                                        <svg
                                        className="w-10 h-10 text-gray-200 dark:text-gray-600"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 16 20"
                                        >
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                        <div>
                                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                        <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                    </div>
                                    <span className="sr-only">Loading...</span>
                                    </div>
                                );
                            })
                            : reviewsData!=null && reviewsData.map((client: any, index: number) => {
                
                                return (
                                <div
                                    key={index}
                                    className={`bg-white rounded-xl p-8 my-10 ${styles.testimonialCard}`}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                    <h5 className="text-[#333333] italic text-[23px] leading-[52px]">
                                        {" "}
                                        &ldquo;{client.text}&rdquo;
                                    </h5>
                                    <span className="text-black font-semibold text-[15px] text-right leading-[18px] min-w-[150px]">
                                        {client.relative_time_description}
                                    </span>
                                    </div>

                                    <div className="flex flex-wrap gap-8 items-center">
                                    <div className="gilroy italic font-bold text-xl h-[50px] w-[50px] relative">
                                        <Image src={client.profile_photo_url} fill={true} alt={""} />
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-bold text-[22px] leading-[52px] text-[var(--green)] mr-2">{`${client.author_name}`}</span>
                                        {reviewArr &&
                                        reviewArr.map((review, index) => {
                                            if (index < client.rating) {
                                            return <FilledStar key={index} />;
                                            } else {
                                            return <BlankStar key={index} />;
                                            }
                                        })}
                                    </div>
                                    </div>
                                </div>
                                );
                            })
                            }

                            {
                                reviewsData!=null && reviewsData.length == 0 && (
                                    <div className="text-center">
                                        Testimonials not found!
                                    </div>
                                )
                            }
                        </div>
                    ):(
                        ""
                    )} */}

                </div>
            </Section>
        </div>
    );
};

export default TripPlanReviews;
