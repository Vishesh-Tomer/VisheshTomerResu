import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GetUserById } from "../../Service/auth";
// import { Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const editUser = () => {
  const history = useHistory();
  const { id } = useParams();

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
    getData();
  }, [id]);
  console.log("setAdminInfo", users);

  const getData = async () => {
    const response = await GetUserById(id);
    console.log("get user data", response);
    if (response?.data?.code === 200) {
      setUsers(response?.data?.data);
      toast.success("User Information fetch successfully");
    }
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">View User Details</h2>
        <form>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your Email"
              value={users.email}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              value={users.name}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your role"
              value={users.role}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Your phone number"
              value={users.phone}
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter Your gender"
              name="dob"
              value={moment(users.dob).format("yyyy-MM-DD")}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your gender"
              value={users.gender}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Address"
              value={users.address}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Your ZipCode"
              value={users.zipcode}
            />
          </div>
          <div xs="12">
            <div className="login-login">
              <button
                type="submit"
                className="btn btn-primary cursor-pointer"
                onClick={() => {
                        history.push("/admin/manageuser");
                      }}
              >
                Click here to back
              </button>
              <ToastContainer />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default editUser;
