import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import {useState, useEffect} from 'react'
import {REFRESH_TOKEN, ACCESS_TOKEN} from '../constants'



function ProtectedRoute({children}){
    const [isAuthorised, setIsAuthorised] = useState(null)

    useEffect(() => {
        auth().catch((error) => {
            console.error("Error during authentication:", error)
            setIsAuthorised(false)
        })
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const response = await api.post('api/token/refresh/', {refresh: refreshToken})
            if (response.status === 200){
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setIsAuthorised(true)
            }
            else{
                setIsAuthorised(false)
            }

        } catch(error){
            setIsAuthorised(false)
            console.log("Error refreshing token:", error)
        }
    }
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuthorised(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if(tokenExpiration < now){
            await refreshToken()
        } else{
            setIsAuthorised(true)
        }
    }
    if(isAuthorised === null){
        return <div>Loading...</div>
    }
    return isAuthorised ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute