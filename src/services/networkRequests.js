import axiosInstance from "./axiosInstance";
export const login = async (loginObj) => {
  console.log("loginObj", loginObj);
  try {
    const { data } = await axiosInstance.post(`/login`, loginObj);
    console.log("Login successful:", data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const carSubmit = async (carObj) => {
  console.log("carObj", carObj);
  try {
    const token = localStorage.getItem("token");
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // axiosInstance.defaults.headers["Content-Type"] =
    //   "multipart/form-data";
    
    const { data } = await axiosInstance.post(`/car`, carObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    console.log("car successful:", data);
    return data;
  } catch (error) {
    console.error("car error :", JSON.stringify(error));
    console.error("car error :", JSON.stringify(error.message));
    throw error;
  }
};
