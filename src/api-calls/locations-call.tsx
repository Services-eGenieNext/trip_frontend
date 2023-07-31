import React from 'react'
import axios from "axios"
import { API_URL } from '@/config/constant'

const _getlocationImages = async (photo_reference: string | number) => {
    let images_Data: any = await axios.get(`${API_URL}/google/placephotos/`, { params: { photo_ref: photo_reference, max_width: "400" } })
    .then(img_response => img_response.data.url)
    .catch((error)=>{
        console.log(error,"photos api failed")
    })
    return images_Data
}

// const _getDetails = async (location_id:string | number) => {
//     let detailData:any = await axios.get(`${API_URL}/location/details/${location_id}/en`)
//     .then((response)=>{
// return response.data
//     })
//     .catch((error)=>{
//         console.log(error,"error")
//     })
//     return detailData
// }

const LocationsCall = async (query:any) => {

    return await axios.get(`${API_URL}/google/textsearch?place=${query}`)
    .then(async (response) => {
        let location_res = response.data.results
        console.log(location_res,query)
        let _store_locations: any = []
        for (let index = 0; index < location_res.length; index++) {
            if(location_res[index].photos){
                let images_Data: any = await _getlocationImages(location_res[index].photos[0].photo_reference)
                // let detail_Data: any = await _getDetails(location_res[index].location_id)
                _store_locations.push({
                    ...location_res[index], images: images_Data
                })
            }else{
                _store_locations.push({
                    ...location_res[index], images: ""
                })
            }
        }
        return _store_locations
    })
    .catch((error)=>{
        console.log(error,"error")
    })
}

export {
    _getlocationImages
}

export default LocationsCall