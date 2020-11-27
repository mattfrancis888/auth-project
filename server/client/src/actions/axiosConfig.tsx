import axios from "axios";
//Used for onine JSON-store database
const auth = axios.create({
    // .. where we make our configurations
    // baseURL: "http://localhost:5000/",
    baseURL:"https://auth-backend-beta.vercel.app/"
});

export default auth;
