import { useAuth } from "../contexts/AuthContext";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user} = useAuth();

    if (user) {
        return children
    }else{
        return <Navigate replace to="/log-in"/>
    }
}

export default PrivateRoute;