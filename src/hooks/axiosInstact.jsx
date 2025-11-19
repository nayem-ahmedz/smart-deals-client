import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://smart-deeals-server.vercel.app",
});

export default axiosInstance;