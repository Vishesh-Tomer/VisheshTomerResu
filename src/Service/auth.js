import axios from "axios";
import { API_URL } from "./url";
var basicToken = "Basic YW5pbDphbmlsQDEyMw==" 
var bearerToken = `bearer ${localStorage.getItem('token')}`
var getAdmi = `bearer ${localStorage.getItem('token')}`
var resumeToken = `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzBmMThkMTEwYmUwMjUxZDE5Y2QyMTQiLCJpYXQiOjE2NjIxODYwMTEsImV4cCI6MTY2NDc3ODAxMSwidHlwZSI6InJlZnJlc2gifQ.djCuEWN0OFVEN5mP8TgBuiyZN8jSbrJcH7fv70cT114`
var updateAdmi =  `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzBmMThkMTEwYmUwMjUxZDE5Y2QyMTQiLCJpYXQiOjE2NjIxODYwMTEsImV4cCI6MTY2NDc3ODAxMSwidHlwZSI6InJlZnJlc2gifQ.djCuEWN0OFVEN5mP8TgBuiyZN8jSbrJcH7fv70cT114`
var UserAddAdmin = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzBmMThkMTEwYmUwMjUxZDE5Y2QyMTQiLCJpYXQiOjE2NjIxOTQzNDgsImV4cCI6MTY2NDc4NjM0OCwidHlwZSI6InJlZnJlc2gifQ.F74wz5E_UmpW3vPxufGoBinBsB6OQbV9TsNYUIKHvpE`
var UserCreateAdmin = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzBmMThkMTEwYmUwMjUxZDE5Y2QyMTQiLCJpYXQiOjE2NjIxOTQzNDgsImV4cCI6MTY2NDc4NjM0OCwidHlwZSI6InJlZnJlc2gifQ.F74wz5E_UmpW3vPxufGoBinBsB6OQbV9TsNYUIKHvpE`
var DeleteUser = `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzBmMThkMTEwYmUwMjUxZDE5Y2QyMTQiLCJpYXQiOjE2NjIxODYwMTEsImV4cCI6MTY2NDc3ODAxMSwidHlwZSI6InJlZnJlc2gifQ.djCuEWN0OFVEN5mP8TgBuiyZN8jSbrJcH7fv70cT114`
var updateuser = `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzBmMThkMTEwYmUwMjUxZDE5Y2QyMTQiLCJpYXQiOjE2NjIxODYwMTEsImV4cCI6MTY2NDc3ODAxMSwidHlwZSI6InJlZnJlc2gifQ.djCuEWN0OFVEN5mP8TgBuiyZN8jSbrJcH7fv70cT114`



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
  
      var response = await axios.get(`${API_URL}/admin/${requestData.id}`);
  
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


  export async function updateAdmin(id, requestData) {
    axios.defaults.headers.common["Authorization"] = updateAdmi

    var response = await axios.patch(`${API_URL}/admin/${id}`, requestData);

    if (response) {
      return response;
    } else {
      return {};
    }
}


// Implement Manager User (Add/Edit/Delete/Active/deactivate) API in admin panel

export async function adminUserAdd() {
  axios.defaults.headers.common["Authorization"] = UserAddAdmin

  var response = await axios.get(`${API_URL}/users`);

  if (response) {
    return response;
  } else {
    return {};
  }
}


export async function adminUserCreate(requestData) {
  axios.defaults.headers.common["Authorization"] = UserCreateAdmin;

  var response = await axios.post(`${API_URL}/admin/user`, requestData);
  if (response) {
    return response;
  } else {
    return [];
  }
}


export async function deleteUser() { 

    axios.defaults.headers.common["Authorization"] = DeleteUser;

    var response = await axios.delete(`${API_URL}/admin/deactivate-user`);

    if (response) {
      return response;
    } else {
      return {};
    }

  }

  export async function updateUser(id, requestData) {
    axios.defaults.headers.common["Authorization"] = updateuser

    var response = await axios.patch(`${API_URL}/admin/user/${id}`, requestData);

    if (response) {
      return response;
    } else {
      return {};
    }
}