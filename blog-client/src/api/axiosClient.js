import axios from "axios";
import {getLocalToken} from "../utilities/localStorage";

const token = getLocalToken();

console.log("MHSLOG : token ->>  ", token);

const axiosClient = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
    },
});

export default axiosClient;