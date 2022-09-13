import React, { useState,useEffect } from "react";
import { useHistory, Link,useParams } from "react-router-dom";
import { updateUser,adminUserAdd } from "../../Service/auth";
// import { Col } from "react-bootstrap";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const editUser = () => {
    const history = useHistory();
    const { id } = useParams();
    console.log(id)


    
    const [users, setUsers] = useState({
    email: "",
    name: "",
    role: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    zipcode: "",
    });
    useEffect(() => {
      const getData = async () => {
        const response = await adminUserAdd();
        console.log("getAdmin", response);
        setUsers(response?.data?.results);
          
      };
      getData();
    }, []);
    console.log("setAdminInfo",users);







  const [name, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("")
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  

  // const token = localStorage.getItem("token")

  // useEffect(() => {
  //   if (!token) {
  //     toast.warning(
  //       "your session has been expired ...kindly login again.",
  //       "yellow"
  //     );
  //     history.push(`/login`);
  //   }
  // }, []);

  const handleName = (value) => {
    setFirstName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleMobileChange = (value) => {
    setPhone(value);
  };

  const handleRoleChange = (value) => {
    setRole(value);

  };

  const handledobChange = (value) => {
    setDob(value);

  };
  const handleGenderChange = (value) => {
    setGender(value);

  };
  const handleAddressChange = (value) => {
    setAddress(value);

  };
  const handleZipCodeChange = (value) => {
    setZipcode(value);

  };


  const handleUpdateUser = async (event) => {
    event.preventDefault();

    
    const data = {
    email: email,
    name: name,
    role: role,
    phone: phone,
    dob: dob,
    gender: gender,
    address: address,
    zipcode: zipcode,
      }
      const response = await updateUser(id , data)
        console.log("data",response);
        if (response?.code === 200) {
          localStorage.setItem('resObject', JSON.stringify(response?.data?.data))
          history.push(`/admin/manageuser`);
          toast.success("Updated Successfully"); 
        } else {
          toast.error("Something went wrong!");
        }
      };



  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
        <form >
        <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your Email"
              name="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
            onChange={(e) => handleName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your role"
              name="role"
              value={role}
            onChange={(e) => handleRoleChange(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Your phone number"
              name="phone"
              value={phone}
            onChange={(e) => handleMobileChange(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter Your gender"
              name="dob"
              value={dob}
            onChange={(e) => handledobChange(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your gender"
              name="gender"
              value={gender}
            onChange={(e) => handleGenderChange(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Address"
              name="address"
              value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Your ZipCode"
              name="zipcode"
              value={zipcode}
            onChange={(e) => handleZipCodeChange(e.target.value)}
            />
          </div>
          <div xs="12">
                  <div className="login-login">
                    <button
                      type="submit"
                      className="btn btn-login cursor-pointer"
                      onClick={(e) => handleUpdateUser(e)}
                    >
                      Update Now
                    </button>
                    <ToastContainer />
                  </div>
                </div>
        </form>
      </div>
    </div>
  )
}

export default editUser