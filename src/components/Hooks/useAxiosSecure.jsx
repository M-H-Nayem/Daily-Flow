import axios from "axios";
// import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `https://real-estate-platform-server-six.vercel.app`,
  // withCredentials: true,
});

const useAxiosSecure = () => {
    // let {logOut}=useAuth()
let navigate = useNavigate()


  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
    //   console.log(token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;
        if (status === 403) {
            navigate('/forbidden');
        }
        else if (status === 401) {
            // logOut()
                // .then(() => {
                //     navigate('/login')
                // })
                // .catch(() => { })
        }

        return Promise.reject(error);
    })


  return axiosSecure;
};

export default useAxiosSecure;
