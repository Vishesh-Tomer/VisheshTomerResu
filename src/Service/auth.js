import axios from "axios";
import { API_URL } from "./url";
var basicToken = "Basic YW5pbDphbmlsQDEyMw==" 
var bearerToken = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmExODBiMDc2YTU0YTE1NjdjNzI2ZWMiLCJpYXQiOjE2NTYxNzcyMTYsImV4cCI6MTY1ODc2OTIxNiwidHlwZSI6InJlZnJlc2gifQ.rr02yaBNIWM0-j3TJ7evGTSNxVyd6P4mjyUdwWMOJQM"
var getAdmi = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmExODBiMDc2YTU0YTE1NjdjNzI2ZWMiLCJpYXQiOjE2NTQ3NTE0MDgsImV4cCI6MTY1NzM0MzQwOCwidHlwZSI6InJlZnJlc2gifQ.wurlBItL73NJo7FaSNnaeXx3jQB5qwzD-6Vu0GNPaRc"
var resumeToken = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmExODBiMDc2YTU0YTE1NjdjNzI2ZWMiLCJpYXQiOjE2NTQ3NTU4NTksImV4cCI6MTY1NzM0Nzg1OSwidHlwZSI6InJlZnJlc2gifQ.O-usO0a_CRMR2uNn7GK34h0zwQdiOOFGGsGIeF-5lZ0"

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

  export async function ChangePas(requestData) {
    axios.defaults.headers.common["Authorization"] = bearerToken;
  
    var response = await axios.post(`${API_URL}admin/change-password/?id=62b743d8621c06d209092eb9`, requestData);
    if (response) {
      return response;
    } else {
      return [];
    }
  }


  export async function Logut(requestData) {
    axios.defaults.headers.common["Authorization"] = basicToken;
  
    var response = await axios.post(`${API_URL}/admin/admin/auth/logout`, requestData);
    if (response) {
      return response;
    } else {
      return [];
    }
  }



  export async function getAdmin(requestData) {
      axios.defaults.headers.common["Authorization"] = getAdmi
  
      var response = await axios.get(`${API_URL}/admin/getAdmin/${requestData.id}`,requestData);
  
      if (response) {
        return response;
      } else {
        return {};
      }
  }


  export async function adminResume(requestData) {
    axios.defaults.headers.common["Authorization"] = resumeToken;
  
    var response = await axios.post(`${API_URL}/admin/auth/resume`, requestData);
    if (response) {
      return response;
    } else {
      return [];
    }
  }