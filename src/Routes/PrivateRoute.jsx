import { Navigate, useLocation } from 'react-router';
import useAuth from '../components/Hooks/useAuth';

const PrivateRoute = ({ children }) => {
    let { user, loading } = useAuth()
    let location = useLocation()
    // console.log(location);
    
    if (loading) {
        return         <span className="loading loading-dots loading-lg text-primary"></span>

    }
    
  if (!user && !user?.email) {
    
    return <Navigate to={"/login"} state={location.pathname} ></Navigate>;
  }
  return children;

};

export default PrivateRoute;