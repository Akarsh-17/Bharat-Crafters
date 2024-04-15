// import axios from "axios";

// export const axiosInstance = axios.create({
//   withCredentials:true
// });

// export const apiConnector = (method, url, bodyData, headers, params) => {
//   return axiosInstance({
//     method: `${method}`,
//     url: `${url}`,
//     data: bodyData ? bodyData : null,
//     headers: headers ? headers : null,
//     params: params ? params : null,
//   });
// };


import axios from "axios";

// Create Axios instance
export const axiosInstance = axios.create({
  // withCredentials: true // Set withCredentials to true by default
});

// Function to make API requests
export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: method,
    url: url,
    data: bodyData || null, // Simplified the ternary operations
    headers: headers || null,
    params: params || null,
  });
};

// Error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Handle errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Response Error:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request Error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
    }
    return Promise.reject(error); // Reject the promise with the error
  }
);

