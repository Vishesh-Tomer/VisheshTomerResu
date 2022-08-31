import axios from "axios";
import { API_URL } from "./url";
var basicToken = "Basic YW5pbDphbmlsQDEyMw==" 


export async function LOGIN(requestData) {
    axios.defaults.headers.common["Authorization"] = basicToken;
  
    var response = await axios.post(`${API_URL}/admin/auth/login`, requestData);
    if (response) {
      return response;
    } else {
      return [];
    }
  }


  export async function Registe(requestData) {
    axios.defaults.headers.common["Authorization"] = basicToken;
  
    var response = await axios.post(`${API_URL}/admin/auth/register`, requestData);
    if (response) {
      return response;
    } else {
      return [];
    }
  }

  export async function Forgetpas(requestData) {
    axios.defaults.headers.common["Authorization"] = basicToken;
  
    var response = await axios.post(`${API_URL}/admin/auth/forgot-password`, requestData);
    if (response) {
      return response;
    } else {
      return [];
    }
  }