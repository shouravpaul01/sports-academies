import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate,  useLocation } from 'react-router-dom';


const PrivateRoute = ({children}) => {
    const {user,isLoading}=useContext(AuthContext)
    const location=useLocation()
    // console.log(location);
    if(isLoading){
        return <div className="min-h-screen max-w-full flex justify-center items-center">
            <span className="loading loading-spinner text-secondary"></span>
        </div>
    }
    if (user) {
        return children
    }
    return <Navigate to={'/signIn&Up'} state={{from:location}} replace></Navigate>
};

export default PrivateRoute;