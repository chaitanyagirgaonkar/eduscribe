// import axios from "axios"
import useAuth from "./useAuth.js"
// import { useNavigate } from "react-router-dom"
import axios from "../api/axios.js"
const useLogout = () => {
    const { setAuth } = useAuth()
    // const navigate = useNavigate()
    const logout = async () => {
        setAuth({})
        try {
            const response = await axios.post('https://eduscribe-beryl.vercel.app/api/v1/users/logout', {
                withCredentials: true
            })
            console.log(response)
        } catch (err) {
            console.log(err);
        }
    }
    return logout;
}

export default useLogout