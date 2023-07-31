import { DetailCall } from '@/api-calls'
import { DetailsCallByGoogle, getLocationImagesById } from '@/api-calls/location-details-call'
import { _getlocationImages } from '@/api-calls/locations-call'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { convertToObject } from 'typescript'

interface ITripDetail {
    item?: any
}

const TripDetail = ({item}: ITripDetail) => {

    const [images, setImages] = useState<any[]>([])
    const [image, setImage] = useState('')
    const [detailLoading, setDetailLoading] = useState(false)
    const [itemDetail, setItemDetail] = useState<any | null>(null)

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
                        
                        let selectedImage = _imagesObject.original ? _imagesObject.original.url : _imagesObject.original.medium.url
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
                let item_Detail: any = await DetailCall(item.place_id)
                setItemDetail(item_Detail.data.result)
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

    return (
        <div className=' sm:px-0 px-4'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="h-[200px] bg-gray-100 rounded-xl overflow-hidden relative">
                    {
                        (!detailLoading && image) && <Image src={image} fill={true} alt={itemDetail?.name} style={{objectFit: "cover"}} />
                    }
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {
                        detailLoading || images.length == 0 ? (
                            <>
                                <div className="h-[98px] bg-gray-100 rounded-xl"></div>
                                <div className="h-[98px] bg-gray-100 rounded-xl"></div>
                                <div className="h-[98px] bg-gray-100 rounded-xl"></div>
                                <div className="h-[98px] bg-gray-100 rounded-xl"></div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                <div>
                    <h3 className="font-medium gilroy text-[28px] leading-[32.96px]">{itemDetail?.name}</h3>
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
                    {/* <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Tuesday - 09:00 – 17:00'} </div>
                    <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Wednesday - 09:00 – 17:00'} </div>
                    <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Friday 09:00 - 17:00'} </div>
                    <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Saturday 09:00 - 17:00'} </div>
                    <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Sunday - 09:00 – 17:00'} </div> */}
                </div>
                <div>
                    <p className="font-normal text-[15px] leading-[28px] text-[var(--gray)]">{itemDetail?.location_id ? itemDetail?.description : itemDetail?.editorial_summary?.overview}</p>
                </div>
            </div>
        </div>
    )
}

export default TripDetail