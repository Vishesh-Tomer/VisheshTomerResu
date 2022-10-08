import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { updateUser, GetUserById } from "../../Service/auth";
// import { Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Select from "react-select";

const editUser = () => {
  // useEffect(() => {
  //   if (!token) {
  //     toast.warning(
  //       "your session has been expired ...kindly login again.",
  //       "yellow"
  //     );
  //     history.push(`/login`);
  //   }
  // }, []);

  const history = useHistory();
  const { id } = useParams();

  const [name, setFirstName] = useState("");
  const [nameError, setnameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValidError, setEmailValidError] = useState(false);
  const [emailIsRequiredError, setEmailIsRequiredlError] = useState(false);
  const [role, setRole] = useState("");
  const [roleError, setroleError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phonelIsRequiredError, setPhoneIsRequiredlError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [dob, setdob] = useState("");
  const [dobIsRequiredError, setdobIsRequiredlError] = useState(false);
  const [dobError, setdobError] = useState(false);
  const getInitialState = () => {
    const value = " ---Select Gender--- ";
    return value;
  };
  const [gender, setgender] = useState(getInitialState);
  const [genderError, setgenderError] = useState(false);
  const [address, setAddress] = useState("");
  const [addressError, setaddressError] = useState(false);
  const [zipcode, setzipcode] = useState("");
  const [zipcodeError, setzipcodeError] = useState(false);
  const [zipcodeIsRequiredError, setzipcodeIsRequiredlError] = useState(false);

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
      setEmail(response?.data?.data?.email);
      setFirstName(response?.data?.data?.name);
      setRole(response?.data?.data?.role);
      setPhone(response?.data?.data?.phone);
      setdob(response?.data?.data?.dob);
      setgender(response?.data?.data?.gender);
      setAddress(response?.data?.data?.address);
      setzipcode(response?.data?.data?.zipcode);
    }
  };

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
    if (value === "") {
      setnameError(true);
    } else {
      setnameError(false);
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (value === "") {
      setEmailValidError(false);
      setEmailIsRequiredlError(true);
    } else if (regex.test(value) === false) {
      setEmailValidError(true);
      setEmailIsRequiredlError(false);
    } else {
      setEmailValidError(false);
      setEmailIsRequiredlError(false);
    }
  };

  const handleMobileChange = (value) => {
    setPhone(value);
    const regex = /^[6-9]{1}\d{9}$/;
    if (value === "") {
      setPhoneIsRequiredlError(true);
      setPhoneError(false);
    } else if (regex.test(value) === false) {
      setPhoneIsRequiredlError(false);
      setPhoneError(true);
    } else {
      setPhoneError(false);
      setPhoneIsRequiredlError(false);
    }
  };

  const handleRoleChange = (value) => {
    setRole(value);
    if (value === "") {
      setroleError(true);
    } else {
      setroleError(false);
    }
  };

  const handleDateOfbirth = (value) => {
    setdob(value);
    var today = new Date();
    var birthDate = new Date(value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (value === "") {
      setdobIsRequiredlError(true);
      setdobError(false);
    } else if (age >= 18) {
      setdobError(false);
      setdobIsRequiredlError(false);
    } else {
      setdobError(true);
      setdobIsRequiredlError(false);
    }
  };

  const handleGender = (e) => {
    setgender(e.target.value);
    if (value === "") {
      setgenderError(true);
    } else {
      setgenderError(false);
    }
  };
  const handleAddressChange = (value) => {
    setAddress(value);
    if (value === "") {
      setaddressError(true);
    } else {
      setaddressError(false);
    }
  };

  const handleZipCodeChange = (value) => {
    setzipcode(value);
    const regex = /^[0-9]{6}|[0-9]{3}\s[0-9]{3}$/;
    if (value === "") {
      setzipcodeIsRequiredlError(true);
      setzipcodeError(false);
    } else if (regex.test(value) === false) {
      setzipcodeIsRequiredlError(false);
      setzipcodeError(true);
    } else {
      setzipcodeIsRequiredlError(false);
      setzipcodeError(false);
    }
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    if (email === "" || !email) {
      setEmailIsRequiredlError(true);
    }
    if (name === "" || !name) {
      setEmailIsRequiredlError(true);
    }
    if (role === "" || !role) {
      setEmailIsRequiredlError(true);
    }
    if ([phone] === "" || !phone) {
      setEmailIsRequiredlError(true);
    }
    if (dob === "" || !dob) {
      setEmailIsRequiredlError(true);
    }
    if (gender === "" || !gender) {
      setEmailIsRequiredlError(true);
    }
    if (address === "" || !address) {
      setEmailIsRequiredlError(true);
    }
    if (zipcode === "" || !zipcode) {
      setEmailIsRequiredlError(true);
    }
    if (
      (email !== "",
      name !== "",
      role !== "",
      phone !== "",
      dob !== "",
      gender !== "",
      address !== "",
      zipcode !== "")
    ) {
      const data = {
        email: email,
        name: name,
        role: role,
        phone: phone,
        dob: dob,
        gender: gender,
        address: address,
        zipcode: zipcode,
      };
      const response = await updateUser(id, data);
      console.log("data", response);
      if (response?.code !== 200) {
        toast.success("Successfully Updated");
        history.push("/admin/manageuser");
        setError(response?.data?.message);
        setIsError(true);
        setTimeout(() => {
          setError("");
          setIsError(false);
        }, 5000);
      } else if (response?.code === 200) {
        setIsError(false);

        // history.push("/admin/manageuser");
        localStorage.setItem("token", response?.data?.data?.token);
        localStorage.setItem("resOb", JSON.stringify(response?.data));
      }
    }
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
        <form>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
            {emailIsRequiredError && (
              <div className="invalid-feedback">Email is required</div>
            )}
            {emailValidError && (
              <div className="invalid-feedback">Please enter valid email</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => handleName(e.target.value)}
            />
            {nameError && (
              <div className="invalid-feedback">Name is required</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your role"
              value={role}
              onChange={(e) => handleRoleChange(e.target.value)}
            />
            {roleError && (
              <div className="invalid-feedback">Role is required</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              maxLength="10"
              className="form-control form-control-lg"
              placeholder="Enter Your phone number"
              value={phone}
              onChange={(e) => handleMobileChange(e.target.value)}
            />
            {phonelIsRequiredError && (
              <div className="invalid-feedback">Phone is required</div>
            )}
            {phoneError ? (
              <div className="invalid-feedback">
                Please enter valid Phone Number
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter Your date of"
              name="dob"
              value={moment(dob).format("yyyy-MM-DD")}
              onChange={(e) => handleDateOfbirth(e.target.value)}
            />
            {dobIsRequiredError && (
              <div className="invalid-feedback">Date of birth is required</div>
            )}
            {dobError && (
              <div className="invalid-feedback">dob is required</div>
            )}
          </div>
          <div className="form-group">
            <select
              className="form-control form-control-lg"
              type="text"
              placeholder="Enter Your gender"
              onChange={handleGender}
              value={gender}
              // isSearchable={true}
            >
              <option> ---Select Gender--- </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {genderError && (
              <div className="invalid-feedback">Gender is required</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => handleAddressChange(e.target.value)}
            />
            {addressError && (
              <div className="invalid-feedback">Address is required</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your ZipCode"
              maxLength="6"
              value={zipcode}
              onChange={(e) => handleZipCodeChange(e.target.value)}
            />
            {zipcodeIsRequiredError && (
              <div className="invalid-feedback">Zip is required</div>
            )}
            {zipcodeError && (
              <div className="invalid-feedback">Zipcode is required</div>
            )}
          </div>
          <div xs="12">
            <div className="login-login">
              <button
                type="submit"
                className="btn btn-primary cursor-pointer mt-3"
                onClick={(e) => handleUpdateUser(e)}
              >
                Update Now
              </button>
              <button
                type="submit"
                className="btn btn-primary cursor-pointer mt-3 ml-3"
                onClick={() => {
                  history.push("/admin/manageuser");
                }}
              >
                Click here to back
              </button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default editUser;
