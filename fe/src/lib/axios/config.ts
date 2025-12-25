import axios from "axios";

const api = axios.create({
  baseURL: "https://api-ash.ashhaburratib.com/public",
});
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized access, e.g., redirect to login page or show an error message
//     }
//     return Promise.reject(error);
//   }
// );
export default api;
