import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const instance = axios.create({
    baseURL: 'http://localhost:3000'
});

const useAxiosSecure = () => {
    const { currentUser } = useAuth();
    useEffect(() => {
        // req interceptor
        const reqInterceptor = instance.interceptors.request.use((config) => {
            config.headers.authorization = `Bearer ${currentUser.accessToken}`
            // console.log(config);
            return config;
        })

        // response interceptor
        const resInterceptor = instance.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log('After error from server', error);
            return Promise.reject(error);
        });

        // clean the memory, by removing observer
        return () => {
            instance.interceptors.request.eject(reqInterceptor);
            instance.interceptors.response.eject(resInterceptor);
        }
    }, []);

    return instance;
}

export default useAxiosSecure;