import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const handleError = (error) => {
  if (error.response?.status === 401) {
    console.log('error==============', error)
    console.log("401 Unauthorized error: Navigate to login screen");
    // window.location.href = "/"
    // router.push("/");
  } else {
    console.error("An error occurred:", error.response?.data);
  }
  return Promise.reject(error?.response?.data || error);
};

// Add the interceptor with centralized error handling
axiosInstance.interceptors.response.use(null, handleError);

export default axiosInstance;
