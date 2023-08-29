import React, { useEffect, useState } from 'react'
import Section from '../UIComponents/Section'
import ComponentTitle from '../UIComponents/ComponentTitle';
import BlueButton from '../UIComponents/Buttons/BlueButton';
import SelectField from '../UIComponents/InputField/SelectField';
import Reviews from '../reviews/reviews';

interface IHomeReviews {
    locations: any[]
}

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

const HomeReviews = ({ locations }: IHomeReviews) => {

    const [openModal, setOpenModal] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [filterData, setFilterData] = useState({
        locationIndex: "",
        reviews: "All"
    })
    const [locaitonOptions, setLocationOptions] = useState<any[]>([])
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        const _locationOptionFunc = async () => {
            if(locations.length > 0)
            {
                let _loc = await locations.filter((loc: any) => loc?.details?.reviews?.length > 0).map((loc: any) => {
                    return loc?.details?.reviews
                })
                // _loc = [].concat(..._loc)
                setData(_loc[0])

                let _list = await locations.map((loc: any, index) => {
                    return {
                        id: index+1,
                        name: loc.name
                    }
                })
                setLocationOptions([..._list])
            }
        }

        _locationOptionFunc()
    }, [locations])

    useEffect(() => {
        
        if(filterData.locationIndex !== "")
        {
            let index = locations.findIndex(opt => opt.name === filterData.locationIndex)
            setData(locations[Number(index)].details.reviews === undefined ? [] : (filterData.reviews !== "All" ? locations[Number(index)].details.reviews.filter((review: any) => review.rating === Number(filterData.reviews)) : locations[Number(index)].details.reviews))
        }
        else
        {
            let _loc = locations.find(loc => loc?.details?.reviews)
            setData(_loc?.details?.reviews === undefined ? [] : (filterData.reviews !== "All" ? _loc?.details.reviews.filter((review: any) => review.rating === Number(filterData.reviews)) : _loc.details.reviews))
        }
        
    }, [filterData]);

    return (
        <div className="w-full flex justify-center">
            <Section className="relative">
                <div className="sm-width sm:px-4 px-0">
                    <div className="flex flex-wrap sm:justify-between justify-center items-center">
                        <div>
                            <ComponentTitle title="Client's Reviews" />
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
                                    setFilterData({...filterData, locationIndex: val})
                                }
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
                        </div>
                    </div>

                    <Reviews show={true} loading={false} data={data} />

                </div>
            </Section>
        </div>
    )
}

export default HomeReviews