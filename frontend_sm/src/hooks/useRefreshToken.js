import axios from "axios"
import useAuth from "./useAuth"

function useRefreshToken() {

    const { setAuth } = useAuth()

    const refresh = async () => {
        const response = await axios.post("/v1/users/refresh-token", {
            withCredentials: true
        })
        setAuth(prev => {
            // console.log(JSON.stringify(prev));
            // console.log(response.data.data.accessToken);
            return { ...prev, accessToken: response.data.data.accessToken }
        })
        return response.data.data.accessToken
    }
    return refresh;


}

export default useRefreshToken
