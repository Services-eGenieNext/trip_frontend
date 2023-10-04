import React, { useEffect, useRef, useState } from 'react'
import PopupWithOverlay from '../UIComponents/Popup/PopupWithOverlay'
import InputField from '../UIComponents/InputField/InputField'
import ProductImg from "/public/static/restaurants.jpg"
import LocationIcon from '../icons/Location'
import Image from 'next/image'
import BlankLocation from "public/images/blank-location.jpg";
import { setItem } from '@/redux/reducers/PlacedetailSlice'
import { useAppDispatch } from '@/redux/hooks'
import axios from 'axios'
import { API_URL } from '@/config/constant'
import { _getlocationImages } from '@/api-calls/locations-call'

interface ISearchPopup {
    show: boolean,
    onClose: () => void
}

const SearchPopup = ({show, onClose}: ISearchPopup)=> {

    const [searchInput, setSearchInput] = useState("")
    const [searchList, setSearchList] = useState([])
    const [loadingSearch, setLoadingSearch] = useState(false)
    const loadingLength = [1,1,1,1,1]
    const apiSource = useRef<any>(null)
    const multiImageApiSource = useRef<any>(null)
    const [searchCount, setSearchCount] = useState<number>(0)

    const dispatch = useAppDispatch()
    

    const LocationsCall = async (query:any) => {

        setSearchCount(searchCount+1)

        return await axios.get(`${API_URL}/google/textsearch?place=${query}`, {
            cancelToken: apiSource.current.token
        })
        .then(async (response) => {

            multiImageApiSource.current = axios.CancelToken.source()
            let location_res = response.data.results

            let _store_locations: any = []
            for (let index = 0; index < location_res.length; index++) {

                if(location_res[index].photos){
                    let images_Data: any = await _getlocationImages(location_res[index].photos[0].photo_reference, "400", multiImageApiSource.current.token)
                    
                    _store_locations.push({
                        ...location_res[index], images: images_Data, image: {image: [{url:images_Data}]}
                    })
                }else{
                    _store_locations.push({
                        ...location_res[index], images: "", image: {image: [{url:""}]}
                    })
                }
            }
            return _store_locations
        })
        .catch((error)=>{
            console.log(error,"error")
        })
    }

    const searchLocations = async (query: string) => {
        await setLoadingSearch(true)

        let res = await LocationsCall(query)
        console.log('res', res)
        if(res?.code !== "ERR_CANCELED")
        {
            setSearchList(res)
        }
        setLoadingSearch(false)
    }
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if(searchInput.length > 2)
            {
                if(searchCount > 0)
                {
                    await apiSource.current.cancel("canceled")
                    if(typeof multiImageApiSource.current.cancel !== "undefined")
                    {
                        await multiImageApiSource.current.cancel("canceled")
                    }
                }
                apiSource.current = axios.CancelToken.source()
                searchLocations(searchInput)
            }
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchInput])

    return (
        <PopupWithOverlay show={show} onClose={() => {onClose()}}>
            <div className="px-4">
                <InputField type="text" label="Search" placeholder='Find your best ...' value={searchInput} onChange={(e) => (e.target.value.length == 0 || e.target.value.trim() !== "") && setSearchInput(e.target.value)} />

                {
                    loadingSearch ? loadingLength.map((length, index) => (
                        <div
                            key={index}
                            role="status"
                            className="md:mx-4 md:my-4 my-8 mx-0 rounded shadow animate-pulse"
                            >
                            <div className="rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-4 h-full w-full">
                                <div className="h-[300px] md:h-full col-span-1 flex items-center justify-center mb-4 bg-gray-300 rounded dark:bg-gray-700">
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
                                </div>
                                <div className="p-3 col-span-3">
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
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
                                            <div className="w-32 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                    </div>
                                </div>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )) : searchList.length > 0 && (
                        <div className="grid grid-cols-1 py-4">
                            {
                                searchList.map((item: any, index: number) => {
                                    let addressArr = item.formatted_address.split(', ')
                                    let country = `${addressArr[addressArr.length - 2]} ${addressArr[addressArr.length - 1]}`
                                    return <div key={index} className="py-4 pt-0">
                                        <span className="rounded-xl overflow-hidden shadow grid grid-cols-1 md:grid-cols-4 bg-white cursor-pointer"
                                        onClick={() => {
                                            dispatch(setItem({
                                                location_id: item.location_id,
                                                place_id: item.place_id
                                            }))
                                        }}
                                        >
                                            <div className="relative w-full h-[300px] md:h-full col-span-1">
                                                <Image src={item.images ? item.images : BlankLocation.src} fill={true} alt={'Product'} className="object-cover" />
                                            </div>
                                            <div className="p-3 col-span-3">
                                                <h4 className="font-medium">{item.name}</h4>
                                                <div className="flex flex-wrap items-center my-1"> 
                                                    <span className="p-1 bg-[#9AB044] rounded-full"> <LocationIcon className="h-3 w-3 bg-[#9AB044]" /> </span>
                                                    <span className="ml-2 text-sm"> {item.formatted_address} </span>
                                                </div>
                                                <p className="text-[var(--gray)] text-sm">{item.formatted_address}</p>
                                            </div>
                                        </span>
                                    </div>
                                })
                            }
                        </div>
                    )
                }
                {
                    (searchList.length == 0 && searchInput.length > 0 && !loadingSearch) && (
                        <div className="text-center mt-5">
                            <p className="bg-gray-50 rounded-xl py-2">Locations not found!</p>
                        </div>
                    )
                }
            </div>

        </PopupWithOverlay>
    )
}

export default SearchPopup