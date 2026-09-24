import axios from "axios";

// Ye ek "pre-configured" axios instance hai - baseURL ek baar set kar diya
// taaki har API call mein poora URL na likhna pade.
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// "Interceptor" - har request jaane se pehle ye function chalega.
// Isme hum localStorage se token nikal ke automatically header mein daal dete hain.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
