import axios from "axios";
const setAuthToken = (token) => {
  //   if (token) {
  //     // Apply authorization token to every request if logged in
  //     axios.defaults.headers.common["Authorization"] = token;
  //   } else {
  //     // Delete auth header
  //     delete axios.defaults.headers.common["Authorization"];
  //   }
  if (token) {
    const authorizationHeader = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTI4NzI1Y2NlMzI3MWZlMzc1MjliNiIsIm5hbWUiOiJuYW1lIiwiaWF0IjoxNjE2MDIxMzAzLCJleHAiOjE2NDc1NzgyMjl9.lHmcJkSpMR9v-izk4EVUrKhPUvA6Kzn8jmF3UZAio9E",
    };
  } else {
    // Delete auth header
    const authorizationHeader = {
      Authorization: "",
    };
  }
};
export default setAuthToken;
