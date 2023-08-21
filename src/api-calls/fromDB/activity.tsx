import axios from "axios"
import { API_URL } from '@/config/constant'

const ActivitiesCallFromDB = async () => {

    return await axios.get(`${API_URL}/trending-activities`)
    .then(async (response) => {
        let activity_res = response.data
        return activity_res
    })
    .catch((error)=>{
        console.log(error,"error")
    })
}

export default ActivitiesCallFromDB