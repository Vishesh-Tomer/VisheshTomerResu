import React, { useEffect, useState } from "react";
import { getAdmin, updateAdmin } from "../../Service/auth";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaEnvelope, FaEyeSlash, FaEye } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function User() {
  const history = useHistory();
  const profileData = JSON.parse(localStorage.getItem("resObj"));
  console.log("profilr", profileData?.id);
  const [name, setFirstName] = useState(profileData.name);
  const [nameIsRequiredError, setNameIsRequiredlError] = useState(false);
  const [email, setemail] = useState(profileData.email);
  const [emailValidError, setEmailValidError] = useState(false);
  const [emailIsRequiredError, setEmailIsRequiredlError] = useState(false);
  const [phone, setPhone] = useState(profileData.phone);
  const [phonelIsRequiredError, setPhoneIsRequiredlError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [type, setType] = useState(profileData.type);
  const [typelIsRequiredError, setTypeIsRequiredlError] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.warning(
        "your session has been expired ...kindly login again.",
        "yellow"
      );
      history.push(`/login`);
    }
  }, []);
  const [adminInfo, setAdminInfo] = useState([]);
  const resobject = JSON.parse(localStorage.getItem("resObj"));
  const id = resobject.id;
  console.log(id);
  useEffect(() => {
    getData();
  }, [id]);
  console.log("setAdminInfo", adminInfo);

  const getData = async () => {
    const response = await getAdmin(id);
    console.log("getAdmin", response);
    setAdminInfo(response?.data);
    toast.success("Admin Information fetch successfully");
  };



  const handleName = (value) => {
    setFirstName(value);
    if (value === "") {
      setNameIsRequiredlError(true);
    } else {
      setNameIsRequiredlError(false);
    }
  };

  const handleEmailChange = (value) => {
    setemail(value);
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
    const regex = /^[6-9]\d{9}$/;
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

  const handleTypeChange = (value) => {
    setType(value);
    if (value === "") {
      setTypeIsRequiredlError(true);
    } else {
      setTypeIsRequiredlError(false);
    }
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    if (email === "" || !email) {
      setEmailIsRequiredlError(true);
    }
    if (name === "" || !name) {
      setNameIsRequiredlError(true);
    }
    if (phone === "" || !phone) {
      setPhoneIsRequiredlError(true);
    }
    if (type === "" || !type) {
      setTypeIsRequiredlError(true);
    }
    const data = {
      name: name,
      email: email,
      phone: phone,
      type: type,
    };
    const response = await updateAdmin(profileData.id, data);
    console.log("data", response);
    if (response.data.code === 200) {
      localStorage.setItem("resObj", JSON.stringify(response?.data?.data));
      toast.success("Updated Successfully");
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label> Full Name (disabled)</label>
                        <div className="form-group mb-1">
                          <div
                            className={
                              nameIsRequiredError
                                ? "form-control is-invalid"
                                : "input-login-control mb-4"
                            }
                          ></div>
                          <Form.Control
                            className="input-login-control"
                            type="text"
                            placeholder="name"
                            disabled
                            value={name}
                            onChange={(e) => handleName(e.target.value)}
                          ></Form.Control>
                          {nameIsRequiredError && (
                            <div className="invalid-feedback">
                              Name is required
                            </div>
                          )}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      <div
                        className={
                          emailValidError
                            ? "form-control is-invalid"
                            : "input-login-control mb-1"
                        }
                      ></div>
                      <div
                        className={
                          emailIsRequiredError
                            ? "form-control is-invalid"
                            : "input-login-control mb-1"
                        }
                      ></div>
                      <label> Email (disabled)</label>
                      <div className="form-group mb-1">
                        <Form.Control
                          className="input-login-control"
                          id="exampleInputtext"
                          aria-describedby="textHelp"
                          type="email"
                          placeholder="Email"
                          disabled
                          value={email}
                          onChange={(e) => handleEmailChange(e.target.value)}
                        ></Form.Control>
                        <span>
                          <FaEnvelope />
                        </span>
                      </div>
                      {emailIsRequiredError && (
                        <div className="invalid-feedback">
                          Email is required
                        </div>
                      )}
                      {emailValidError && (
                        <div className="invalid-feedback">
                          Please enter valid email
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Phone Number</label>
                        <div className="form-group mb-1">
                          <div
                            className={
                              phonelIsRequiredError
                                ? "form-control is-invalid"
                                : "input-login-control mb-4"
                            }
                          ></div>
                          <Form.Control
                            className={
                              phoneError
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            type="text"
                            placeholder="Phone Number"
                            onChange={(e) => handleMobileChange(e.target.value)}
                            maxLength="10"
                            value={phone}
                          ></Form.Control>
                          {phonelIsRequiredError && (
                            <div className="invalid-feedback">
                              Phone is required
                            </div>
                          )}
                          {phoneError ? (
                            <div className="invalid-feedback">
                              Please enter valid Phone Number
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Admin type (disabled)</label>
                        <div className="form-group mb-1">
                          <div
                            className={
                              typelIsRequiredError
                                ? "form-control is-invalid"
                                : "input-login-control mb-4"
                            }
                          ></div>
                          <Form.Control
                            type="text"
                            placeholder="Admin type"
                            disabled
                            value={type}
                            onChange={(e) => handleTypeChange(e.target.value)}
                          ></Form.Control>
                          {typelIsRequiredError && (
                            <div className="invalid-feedback">
                              Type is required
                            </div>
                          )}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br></br>
                  <br></br>

                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={(e) => handleUpdateProfile(e)}
                  >
                    Update Profile
                  </Button>
                  <ToastContainer />
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg")}
                    ></img>
                    <h5 className="title">{adminInfo.name}</h5>
                  </a>
                  <p className="description">{adminInfo.email}</p>
                  <br></br>
                  <p className="description">{adminInfo.phone}</p>
                  <br></br>
                  <p className="description">{adminInfo.type}</p>
                  <br></br>
                </div>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
