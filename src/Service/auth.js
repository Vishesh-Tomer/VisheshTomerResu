import axios from "axios";
import { API_URL } from "./url";
import { useParams } from "react-router-dom";
var basicToken = "Basic YW5pbDphbmlsQDEyMw==" 
var bearerToken = `Bearer ${localStorage.getItem('token')}`




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

  export async function ChangePas(requestData, id) {
    axios.defaults.headers.common["Authorization"] = bearerToken;
  
    var response = await axios.post(`${API_URL}/admin/change-password/?id=${id}`, requestData);
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

  export async function logout() {
      
    axios.defaults.headers.common["Authorization"] = bearerToken;
      var response = await axios.post(`${API_URL}/admin/auth/logout`, {
        refreshToken: bearerToken,
      });
      if (response) {
        return response;
      } else {
        return {};
      }
    }



  export async function GetUserById(id) {
      
      axios.defaults.headers.common["Authorization"] = bearerToken;
  
      var response = await axios.get(`${API_URL}/admin/user/${id}`);
  
      if (response) {
        return response;
      } else {
        return {};
      }
  }


  export async function getAdmin(id) {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.get(`${API_URL}/admin/${id}`);

    if (response) {
      return response;
    } else {
      return {};
    }
}




  export async function adminResume(requestData) {
    axios.defaults.headers.common["Authorization"] = bearerToken;
  
    var response = await axios.post(`${API_URL}/admin/auth/resume`, requestData);
    if (response) {
      return response;
    } else {
      return [];
    }
  }


  export async function updateAdmin(id, requestData) {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.patch(`${API_URL}/admin/${id}`, requestData);

    if (response) {
      return response;
    } else {
      return {};
    }
}


// Implement Manager User (Add/Edit/Delete/Active/deactivate) API in admin panel

export async function adminUserList(data) {
  axios.defaults.headers.common["Authorization"] = bearerToken;

  var response = await axios.get(`${API_URL}/users?page=${data?.page}&limit=${data?.limit}&sortBy=asc&`);
  if (response) {
    return response;
  } else {
    return {};
  }
}


export async function adminUserCreate(requestData) {
  axios.defaults.headers.common["Authorization"] = bearerToken;

  var response = await axios.post(`${API_URL}/admin/user`, requestData);
  if (response) {
    return response;
  } else {
    return [];
  }
}


export async function deleteUserById(id) { 

    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.delete(`${API_URL}/admin/user/${id}`);

    if (response) {
      return response;
    } else {
      return {};
    }

  }

  export async function updateUser(id, requestData) {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.patch(`${API_URL}/admin/user/${id}`, requestData);

    if (response) {
      return response;
    } else {
      return {};
    }
}


export async function getResume(requestData) {
  axios.defaults.headers.common["Authorization"] = bearerToken;

  var response = await axios.get(`${API_URL}/admin/adminuserresume/${requestData.id}`);

  if (response) {
    return response;
  } else {
    return {};
  }
}


export async function resumeList(data) {
  axios.defaults.headers.common["Authorization"] = bearerToken;

  var response = await axios.get(`${API_URL}/admin/resume-list?page=${data?.page}&limit=${data?.limit}&sortBy=asc`);

  if (response) {
    return response;
  } else {
    return {};
  }
}

export async function updateResume(id, requestData) {
  axios.defaults.headers.common["Authorization"] = bearerToken;

  var response = await axios.patch(`${API_URL}/admin/adminuserresume/${id}`, requestData);

  if (response) {
    return response;
  } else {
    return {};
  }
}


  export async function GetResumeById(id) {
      
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.get(`${API_URL}/admin/adminuserresume/${id}`);

    if (response) {
      return response;
    } else {
      return {};
    }
}

export async function deleteResumeById(id) { 

  axios.defaults.headers.common["Authorization"] = bearerToken;

  var response = await axios.delete(`${API_URL}/admin/adminuserresume/${id}`);

  if (response) {
    return response;
  } else {
    return {};
  }

}