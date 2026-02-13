import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const jwt = Cookies.get('jwt_token')
    if (jwt===undefined){
        return <Navigate to='/login' replace/>
    }
    return children
}

export default ProtectedRoute