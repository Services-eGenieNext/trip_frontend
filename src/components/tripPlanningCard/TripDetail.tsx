import { DetailCall } from '@/api-calls'
import { DetailsCallByGoogle, getLocationImagesById } from '@/api-calls/location-details-call'
import { _getlocationImages } from '@/api-calls/locations-call'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import MapIcon from "/public/images/google-map-icon.png";
import Link from 'next/link'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CSS from "./TripDetail.module.css"

interface ITripDetail {
    item?: any
}

const TripDetail = ({item}: ITripDetail) => {

    const [images, setImages] = useState<any[]>([])
    const [image, setImage] = useState('')
    const [detailLoading, setDetailLoading] = useState(false)
    const [itemDetail, setItemDetail] = useState<any | null>(null)
    const [viewMore, setViewMore] = useState(false)

    useEffect(() => {
        const _defItemDetail = async () => {
            if(itemDetail?.location_id)
            {
                let res: any = await getLocationImagesById(itemDetail.location_id)
                
                if(res.data.data && res.data.data.length > 0)
                {
                    let _images = []
                    for (let index = 0; index < res.data.data.length; index++) {
                        let _imagesObject = res.data.data[index].images
                        
                        let selectedImage = _imagesObject.original ? _imagesObject.original.url : _imagesObject.medium.url
                        _images.push(selectedImage)
                    }
                    setImages(_images)
                    setImage(_images[0])
                }
            }
            if(itemDetail?.place_id && itemDetail.photos)
            {
                let _images = []
                for (let index = 0; index < itemDetail.photos.length; index++) {
                    _images.push(await _getlocationImages(itemDetail.photos[index].photo_reference))
                }
                setImages(_images)
                setImage(_images[0])
            }
        }
        
        _defItemDetail()
    }, [itemDetail])

    useEffect(() => {
        setImages([])
        setImage('')
        const _def = async () => {
            setDetailLoading(true)
            if(item.location_id)
            {
                let item_Detail: any = await DetailCall(item.location_id)
                setItemDetail(item_Detail.data)
            }
            else if(item.place_id)
            {
                let item_Detail: any = await DetailsCallByGoogle(item.place_id)
                setItemDetail(item_Detail.data.result)
                
            }
            setDetailLoading(false)
        }
        _def()
    }, [item])


    const [prevBtnDisabled, setPrevBtnDisabled] = useState(false)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(false)
    function SampleNextArrow(props: any) {
        const { className, style, onClick } = props;
        return (
        <div
            className={nextBtnDisabled == true ? `cursor-pointer select-none ${CSS["activity_arrow_next_disabled"]} `: `cursor-pointer select-none  ${CSS["activity_arrow_next"]}`}
            style={{
            ...style,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}
            onClick={onClick}
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
            </svg>
        </div>
        );
    }
    
    function SamplePrevArrow(props: any) {
        const { className, style, onClick } = props;
        return (
        <div
            className={prevBtnDisabled == true ? `cursor-pointer select-none ${CSS["activity_arrow_prev_disabled"]}` : `cursor-pointer select-none ${CSS["activity_arrow_prev"]}`}
            style={{
            ...style,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}
            onClick={onClick}
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
            </svg>
        </div>
        );
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
        {
            breakpoint: 1200,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            },
        },
        {
            breakpoint: 800,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            },
        },
        {
            breakpoint: 550,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            },
        },
        ],
        // afterChange,
    };

    return (
        <div className='w-full sm:px-0 px-4'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                <div className="h-[200px] min-w-[400px] w-full bg-gray-100 rounded-xl overflow-hidden relative">
                    {
                        (!detailLoading && image) ? 
                            <Image src={image} fill={true} alt={itemDetail?.name} style={{objectFit: "cover"}} /> : (
                            <div className="animate-pulse flex justify-center items-center h-full">
                                <svg
                                className="w-20 h-20 text-gray-200 dark:text-gray-600"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 20"
                                >
                                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                </svg>
                            </div>
                        )
                    }
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {
                        detailLoading || images.length == 0 ? (
                            <>
                                <div className="h-[98px] max-w-[199px] bg-gray-100 rounded-xl animate-pulse flex justify-center items-center">
                                    <svg
                                    className="w-16 h-16 text-gray-200 dark:text-gray-600"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 16 20"
                                    >
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                    </svg>
                                </div>
                                <div className="h-[98px] max-w-[199px] bg-gray-100 rounded-xl animate-pulse flex justify-center items-center">
                                    <svg
                                    className="w-16 h-16 text-gray-200 dark:text-gray-600"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 16 20"
                                    >
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                    </svg>
                                </div>
                                <div className="h-[98px] max-w-[199px] bg-gray-100 rounded-xl animate-pulse flex justify-center items-center">
                                    <svg
                                    className="w-16 h-16 text-gray-200 dark:text-gray-600"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 16 20"
                                    >
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                    </svg>
                                </div>
                                <div className="h-[98px] max-w-[199px] bg-gray-100 rounded-xl animate-pulse flex justify-center items-center">
                                    <svg
                                    className="w-16 h-16 text-gray-200 dark:text-gray-600"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 16 20"
                                    >
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                    </svg>
                                </div>
                            </>
                        ) : (
                            images.slice(0,4).map((img: string, imgIndex: number) => {
                                return <div key={imgIndex} className="h-[98px] bg-gray-100 rounded-xl overflow-hidden relative">
                                    <Image src={img} fill={true} alt={itemDetail?.name} style={{objectFit: "cover"}} />
                                </div>
                            })
                        )
                    }
                </div>
            </div>
            {
                images.length > 4 && <span className="text-[var(--blue)] text-right ml-auto block cursor-pointer select-none" onClick={() => setViewMore(!viewMore)}>View more pics</span>
            }
            <div className="w-[90%] mx-auto arrow_remove mt-4">
                {
                    viewMore && 
                    <Slider {...settings}>
                        {
                            images.slice(4).map((img: string, imgIndex: number) => {
                                return <div key={imgIndex}  className="px-1">
                                    <div className="h-[98px] w-[100%] bg-gray-100 rounded-xl overflow-hidden relative">
                                        <Image src={img} fill={true} alt={itemDetail?.name} style={{objectFit: "cover"}} />
                                    </div>
                                </div>
                            })
                        }
                    </Slider>
                }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                <div className="relative">
                    {
                        (!detailLoading && itemDetail) ? (
                            <>
                            {
                                itemDetail?.url && 
                                <Link href={itemDetail?.url} target="_blank" className="absolute top-0 right-[1rem] shadow-lg rounded-xl overflow-hidden bg-white">
                                    <Image src={MapIcon} alt='map icon' className="p-2" />
                                </Link>
                            }
                            
                            <h3 className="font-medium gilroy text-[28px] leading-[32.96px] max-w-[340px]">
                                {itemDetail?.name} <span className="text-sm text-[var(--gray)]">({
                                    itemDetail?.address_components?.find((adr: any) => adr.types[0] === "locality")?.long_name ?? (itemDetail?.address_components?.find((adr: any) => adr.types[0] === "sublocality_level_1")?.long_name ?? itemDetail?.address_components?.find((adr: any) => adr.types[0] === "postal_town")?.long_name ?? itemDetail?.address_components?.find((adr: any) => adr.types[0] === "country")?.long_name)
                                })</span>
                            </h3>
                            <div className="h-[3px] w-[51px] bg-[var(--blue)] my-5"></div>
                            {
                                itemDetail?.hours?.weekday_text || itemDetail?.opening_hours?.weekday_text && (
                                    <>
                                    <h4 className="text-[15px] leading-[18px] font-bold mb-2">Hours:</h4>
                                    {
                                        itemDetail?.location_id ?
                                        itemDetail?.hours?.weekday_text && itemDetail.hours?.weekday_text.map((time: any, index: number) => {
                                            return <div key={index} className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {time} </div>
                                        }) : itemDetail?.opening_hours?.weekday_text && itemDetail.opening_hours?.weekday_text.map((time: any, index: number) => {
                                            return <div key={index} className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {time} </div>
                                        })
                                    }
                                    </>       
                                )
                            }
                            </>
                        ) : (
                            <>
                            <div className="h-[20px] max-w-[340px] bg-gray-100 rounded-lg animate-pulse my-2" />
                            <div className="h-[10px] max-w-[50px] bg-gray-100 rounded-lg animate-pulse my-5" />
                            <div className="h-[10px] max-w-[150px] bg-gray-100 rounded-lg animate-pulse my-3" />
                            <div className="h-[10px] max-w-[150px] bg-gray-100 rounded-lg animate-pulse my-3" />
                            <div className="h-[10px] max-w-[150px] bg-gray-100 rounded-lg animate-pulse my-3" />
                            <div className="h-[10px] max-w-[150px] bg-gray-100 rounded-lg animate-pulse my-3" />
                            </>
                        )
                    }
                    {/* <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Tuesday - 09:00 – 17:00'} </div>
                    <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Wednesday - 09:00 – 17:00'} </div>
                    <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Friday 09:00 - 17:00'} </div>
                    <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Saturday 09:00 - 17:00'} </div>
                    <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Sunday - 09:00 – 17:00'} </div> */}
                </div>
                <div>
                    {
                        !detailLoading ? <p className="font-normal text-[15px] leading-[28px] text-[var(--gray)]">{itemDetail?.location_id ? itemDetail?.description : itemDetail?.editorial_summary?.overview}</p> : <>
                            <div className="h-[20px] w-full bg-gray-100 rounded-lg animate-pulse my-2" />
                            <div className="h-[20px] w-full bg-gray-100 rounded-lg animate-pulse my-2" />
                            <div className="h-[20px] w-full bg-gray-100 rounded-lg animate-pulse my-2" />
                            <div className="h-[20px] w-full bg-gray-100 rounded-lg animate-pulse my-2" />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default TripDetail