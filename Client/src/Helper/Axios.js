import axios from "axios";
const axiosFetch = async ({ url, method, data = null }) => {
  //api to fetch data from postman mock server
  try {
    // axios.get("dsa", {});
    console.log("error");
    const token = sessionStorage.getItem("token");
    
    // Build headers dynamically
    const headers = {};
    if (token && token !== "null" && token !== "undefined" && token !== "{}") {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios.request({
      url: "http://localhost:9090/" + url,
      method,
      data: data,
      headers: headers,
    });
    return response;
  } catch (err) {
    console.error("API error in Axios Fetch: ", err);
    return { data: [] }; // Fallback to an empty list so map() doesn't crash
  }
};

export default axiosFetch;
