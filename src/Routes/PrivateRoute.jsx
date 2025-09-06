import { Navigate, useLocation } from 'react-router';
import useAuth from '../components/Hooks/useAuth';

const PrivateRoute = ({ children }) => {
    let { user, Loading } = useAuth()
    let location = useLocation()
    // console.log(location);
    
    if (Loading) {
        return     <span className="loading loading-dots loading-lg text-primary"></span>
    }
    
  if (!user && !user?.email) {
    
    return <Navigate to={"/login"} state={location.pathname} ></Navigate>;
  }
  return children;

};

export default PrivateRoute;