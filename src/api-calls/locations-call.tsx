import React from 'react'
import axios from "axios"
import { API_URL } from '@/config/constant'

const _getlocationImages = async (location_id: string | number) => {
    let images_Data: any = await axios.get(`${API_URL}/location/photos/${location_id}`).then(img_response => img_response.data.data)
    return images_Data
}

const LocationsCall = async () => {

    return await axios.get(`${API_URL}/location/search/best hotels`)
    .then(async (response) => {
        let location_res = response.data.data
        let _store_locations: any = []
        for (let index = 0; index < location_res.length; index++) {
            let images_Data: any = await _getlocationImages(location_res[index].location_id)
            _store_locations.push({
                location: location_res[index],
                images: images_Data
            })
        }
        return _store_locations
    })
}

export default LocationsCall