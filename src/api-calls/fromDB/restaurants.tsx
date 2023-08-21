import axios from "axios"
import { API_URL } from '@/config/constant'

const RestaurantsCallFromDB = async () => {

    return await axios.get(`${API_URL}/top-restaurants`)
    .then(async (response) => {
        let restaurants_res = response.data
        return restaurants_res
    })
    .catch((error)=>{
        console.log(error,"error")
    })
}

export default RestaurantsCallFromDB