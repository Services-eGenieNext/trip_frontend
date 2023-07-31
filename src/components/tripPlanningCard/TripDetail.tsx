import { DetailCall } from '@/api-calls'
import { getLocationImagesById } from '@/api-calls/location-details-call'
import { _getlocationImages } from '@/api-calls/locations-call'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface ITripDetail {
    item?: any
}

const TripDetail = ({item}: ITripDetail) => {

    const [images, setImages] = useState<any[]>([])
    const [image, setImage] = useState('')
    const [detailLoading, setDetailLoading] = useState(false)

    useEffect(() => {
        const _def = async () => {
            setDetailLoading(true)
            if(item.location_id)
            {
                let res: any = await getLocationImagesById(item.location_id)
                
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
            else if(item.place_id)
            {
                let _images = []
                for (let index = 0; index < item.photos.length; index++) {
                    _images.push(await _getlocationImages(item.photos[index].photo_reference))
                }
                setImages(_images)
                setImage(_images[0])
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
                        (!detailLoading && image) && <Image src={image} fill={true} alt={item.name} style={{objectFit: "cover"}} />
                    }
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {
                        detailLoading ? (
                            <>
                                <div className="h-[98px] bg-gray-100 rounded-xl"></div>
                                <div className="h-[98px] bg-gray-100 rounded-xl"></div>
                                <div className="h-[98px] bg-gray-100 rounded-xl"></div>
                                <div className="h-[98px] bg-gray-100 rounded-xl"></div>
                            </>
                        ) : (
                            images.slice(0,4).map((img: string, imgIndex: number) => {
                                return <div key={imgIndex} className="h-[98px] bg-gray-100 rounded-xl overflow-hidden relative">
                                    <Image src={img} fill={true} alt={item.name} style={{objectFit: "cover"}} />
                                </div>
                            })
                        )
                    }
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                <div>
                    <h3 className="font-medium gilroy text-[28px] leading-[32.96px]">{item.name}</h3>
                    <div className="h-[3px] w-[51px] bg-[var(--blue)] my-5"></div>

                    <h4 className="text-[15px] leading-[18px] font-bold mb-2">Hours:</h4>
                    {
                        item.location_id ?
                        item.hours?.weekday_text && item.hours?.weekday_text.map((time: any, index: number) => {
                            return <div key={index} className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {time} </div>
                        }) : item.opening_hours?.weekday_text && item.opening_hours?.weekday_text.map((time: any, index: number) => {
                            return <div key={index} className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {time} </div>
                        })
                    }
                    {/* <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Tuesday - 09:00 – 17:00'} </div>
                    <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Wednesday - 09:00 – 17:00'} </div>
                    <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Friday 09:00 - 17:00'} </div>
                    <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Saturday 09:00 - 17:00'} </div>
                    <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Sunday - 09:00 – 17:00'} </div> */}
                </div>
                <div>
                    <p className="font-normal text-[15px] leading-[28px] text-[var(--gray)]">{item.location_id ? item.description : item.editorial_summary?.overview}</p>
                </div>
            </div>
        </div>
    )
}

export default TripDetail