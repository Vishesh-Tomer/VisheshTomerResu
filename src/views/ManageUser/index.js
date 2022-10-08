import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Modal,
  Container,
  Row,
  Col,
  Card,
  Table,
  Nav,
  Dropdown,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { adminUserList, adminUserCreate, deleteUserById } from "Service/auth";
import { useHistory, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaEnvelope, FaEyeSlash, FaEye } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./userStyle.scss";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";

function Home() {
  const history = useHistory();
  const { id } = useParams();
  // const emailData = JSON.parse(localStorage.getItem("resObject"));
  // console.log(emailData.email , "reskue")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [page, setPageNo] = useState(1);
  const [email, setemail] = useState("");
  const [emailValidError, setEmailValidError] = useState(false);
  const [emailIsRequiredError, setEmailIsRequiredlError] = useState(false);
  const [EmailError, setEmailError] = useState(false);
  // Name UseState
  const [name, setName] = useState("");
  const [nameValidError, setnameValidError] = useState(false);
  const [nameIsRequiredError, setnameIsRequiredlError] = useState(false);

  const [role, setrole] = useState("");
  const [roleIsRequiredError, setRoleIsRequiredlError] = useState(false);
  const [roleError, setRoleError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordIsRequiredError, setPasswordIsRequiredlError] =
    useState(false);
  const [passworderror, setPasswordError] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [phone, setphone] = useState("");
  const [phoneIsRequiredError, setPhoneIsRequiredlError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [dob, setdob] = useState("");
  const [dobIsRequiredError, setdobIsRequiredlError] = useState(false);
  const [dobError, setdobError] = useState(false);
  const getInitialState = () => {
    const value = "";
    return value;
  };
  const [gender, setgender] = useState(getInitialState);
  const [genderIsRequiredError, setgenderIsRequiredlError] = useState(false);
  const [address, setaddress] = useState("");
  const [addressIsRequiredError, setaddressIsRequiredlError] = useState(false);
  const [zipcode, setzipcode] = useState("");
  const [zipcodeError, setzipcodeError] = useState(false);
  const [zipcodeIsRequiredError, setzipcodeIsRequiredlError] = useState(false);
  const [iserror, setIsError] = useState(false);
  const [error, setError] = useState("");

  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");
  const getData = async (pageNo) => {
    const requestedData = {
      limit: 10,
      page: pageNo,
    };
    const response = await adminUserList(requestedData);
    console.log("getAdmin", response);
    if (response?.data?.code === 200) {
      setUsers(response?.data?.data?.results);
      setTotalItemsCount(response?.data?.data?.totalResults);
    }
  };

  const handlePageChange = (pageNumber) => {
    // pageNo = pageNumber;
    setPageNo(pageNumber);
    getData(pageNumber);
  };

  useEffect(() => {
    if (!token) {
      toast.warning(
        "your session has been expired ...kindly login again.",
        "yellow"
      );
      history.push(`/login`);
    } else {
      getData(page);
    }
  }, []);

  console.log("setAdminInfo", users);

  const deleteList = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do yo want to remove this document?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteListItems(id);
        toast.success("User profile has been deleted successfully");
      }
    });
  };

  const deleteListItems = async (id) => {
    const response = await deleteUserById(id);
    console.log("del", response);
    if (response?.data?.code === 200) {
      // toast.success("User profile has been deleted successfully");
      getData(page);
    } else {
      toast.error("Some error occured");
      setIsError(true);
      setError("Some error occured");
      setTimeout(() => {
        setIsError(false);
      }, 5000);
    }
  };

  // Handle Name
  const handleNameChange = (value) => {
    setName(value);
    const regex = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
    if (value === "") {
      setnameValidError(false);
      setnameIsRequiredlError(true);
    } else if (regex.test(value) === false) {
      setnameValidError(true);
      setnameIsRequiredlError(false);
    } else {
      setnameValidError(false);
      setnameIsRequiredlError(false);
    }
  };

  const handleRole = (value) => {
    setrole(value);
    if (value === "") {
      setRoleIsRequiredlError(true);
      setRoleError(false);
    } else if (value !== "user" && value !== "admin") {
      setRoleError(true);
      setRoleIsRequiredlError(false);
    } else {
      setRoleIsRequiredlError(false);
      setRoleError(false);
    }
  };

  const handlePassword = (value) => {
    setPassword(value);
    const regex =
      /^(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (value === "") {
      setPasswordError(false);
      setPasswordIsRequiredlError(true);
    } else if (regex.test(value) === false) {
      setPasswordError(true);
      setPasswordIsRequiredlError(false);
    } else {
      setPasswordError(false);
      setPasswordIsRequiredlError(false);
    }
  };

  const handleShowPassword = (event, type) => {
    event.preventDefault();
    if (type === "show") {
      setIsShowPassword(true);
    } else {
      setIsShowPassword(false);
    }
  };

  const handleGender = (e) => {
    setgender(e.target.value);
    if (value === "male") {
      setgenderIsRequiredlError(false);
    } else if (value === "female") {
      setgenderIsRequiredlError(false);
    } else {
      setgenderIsRequiredlError(true);
    }
  };

  const handleaddress = (value) => {
    setaddress(value);
    if (value === "") {
      setaddressIsRequiredlError(true);
    } else {
      setaddressIsRequiredlError(false);
    }
  };

  const handlezipcode = (value) => {
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
    setphone(value);
    const regex = /^[6-9]{1}\d{9}$/;
    if (value === "") {
      setPhoneIsRequiredlError(true);
      setPhoneError(false);
    } else if (regex.test(value) === false) {
      setPhoneError(true);
      setPhoneIsRequiredlError(false);
    } else {
      setPhoneError(false);
      setPhoneIsRequiredlError(false);
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
    } else if (age >= 12) {
      setdobError(false);
      setdobIsRequiredlError(false);
    } else {
      setdobError(true);
      setdobIsRequiredlError(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    if (email === "" || !email) {
      setEmailIsRequiredlError(true);
    }
    if (password === "" || !password) {
      setPasswordIsRequiredlError(true);
    }
    if (name === "" || !name) {
      setnameIsRequiredlError(true);
    }
    if (role === "" || !role) {
      setRoleIsRequiredlError(true);
    }
    if (phone === "" || !phone) {
      setPhoneIsRequiredlError(true);
    }
    if (dob === "" || !dob) {
      setdobIsRequiredlError(true);
    }
    if (gender === "" || !gender) {
      setgenderIsRequiredlError(true);
    }
    if (address === "" || !address) {
      setaddressIsRequiredlError(true);
    }
    if (zipcode === "" || !zipcode) {
      setzipcodeIsRequiredlError(true);
    }

    if (
      email !== "" &&
      password !== "" &&
      name !== "" &&
      role !== "" &&
      phone !== "" &&
      dob !== "" &&
      gender !== "" &&
      address !== "" &&
      zipcode !== ""
    ) {
      const adddata = {
        email: email,
        name: name,
        role: role,
        password: password,
        phone: phone,
        dob: dob,
        gender: gender,
        address: address,
        zipcode: zipcode,
      };
      const response = await adminUserCreate(adddata);
      console.log(response, "respoonse");
      if (response?.data?.user?.code !== 200) {
        toast.error(
          "The user email already exists. Please use a different email"
        );
        setError("The user email already exists. Please use a different email");
        setIsError(true);
        setTimeout(() => {
          setError("");
          setIsError(false);
        }, 5000);
      } else {
        toast.success("User Successfully Created");
        setIsError(false);
        localStorage.setItem(
          "token",
          response?.data?.data?.tokens.refresh.token
        );
        localStorage.setItem(
          "resObject",
          JSON.stringify(response?.data?.user?.data)
        );
        setemail("");
        setName("");
        setrole("");
        setPassword("");
        setphone("");
        setdob("");
        setgender("");
        setaddress("");
        setzipcode("");
      }
    }
  };
  return (
    <div className="container ">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row ">
          <div className="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form className="form-inline">
                <input
                  className="form-control bck mr-sm-2"
                  type="search"
                  placeholder="Search User"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div
            className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b>User Details</b>
            </h2>
          </div>

          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <button
              onClick={handleShow}
              type="submit"
              class="btn btn-primary"
              data-toggle="button"
              aria-pressed="false"
              autocomplete="off"
            >
              Add New User
            </button>
          </div>
        </div>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">User Data</Card.Title>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th className="border-0">Email</th>
                        <th className="border-0">Name</th>
                        <th className="border-0">Role </th>
                        <th className="border-0">phone </th>
                        <th className="border-0">Date of Birth</th>
                        <th className="border-0">Gender </th>
                        <th className="border-0">Address</th>
                        <th className="border-0">Zipcode </th>
                        <th className="border-0">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.map((user, index) => (
                        <tr>
                          <th>{index + 1}</th>
                          <td>{user?.email}</td>
                          <td>{user?.name}</td>
                          <td>{user?.role}</td>
                          <td>{user?.phone.slice(0, 10)}</td>
                          <td>{user?.dob.slice(0, 10)}</td>
                          <td>{user?.gender}</td>
                          <td>{user?.address.slice(0, 15)}</td>
                          <td>{user?.zipcode}</td>
                          <td>
                            <Dropdown as={Nav.Item}>
                              <Dropdown.Toggle
                                as={Nav.Link}
                                data-toggle="dropdown"
                                id="dropdown-67443507"
                                variant="default"
                                className="m-0"
                              >
                                <i className="nc-icon nc-settings-gear-64"></i>
                                {/* <span className="notification">3</span> */}
                                {/* <span className="d-lg-none ml-1">Notification</span> */}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => {
                                    history.push(`/edituser/${user?.id}`);
                                  }}
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    history.push(`/viewuser/${user?.id}`);
                                  }}
                                >
                                  View
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => deleteList(user?.id)}
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
              {users.length !== 0 && (
                <Pagination
                  color="primary"
                  activePage={page}
                  items={10}
                  totalItemsCount={totalItemsCount}
                  pageRangeDisplayed={5}
                  onChange={(e) => handlePageChange(e)}
                />
              )}
            </Col>
          </Row>
        </Container>

        {/* <!--- Model Box ---> */}
        <div className="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header></Modal.Header>
            <Modal.Body>
              <form onSubmit={login}>
                {iserror ? (
                  <div className="alert alert-danger">{error}</div>
                ) : null}
                <div className="form-group">
                  <div
                    className={
                      emailValidError
                        ? "form-control is-invalid"
                        : "input-login-control mb-4"
                    }
                  ></div>
                  <div
                    className={
                      emailIsRequiredError
                        ? "form-control is-invalid"
                        : "input-login-control mb-4"
                    }
                  ></div>
                  {/* {iserror ? (
                    <div className="alert alert-danger">{error}</div>
                  ) : null} */}
                  <div className="form-group"></div>
                  <div className="form-group mb-1">
                    <input
                      className="form-control mb-1"
                      id="exampleInputtext"
                      aria-describedby="textHelp"
                      type="email"
                      maxLength="40"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                    />
                    <span mt="2">
                      <FaEnvelope />
                    </span>
                  </div>
                  {emailIsRequiredError && (
                    <div className="invalid-feedback">Email is required</div>
                  )}
                  {emailValidError && (
                    <div className="invalid-feedback">
                      Please enter valid email
                    </div>
                  )}
                  {EmailError && (
                    <div className="invalid-feedback">
                      This Email privously register
                    </div>
                  )}
                </div>

                <div className="form-group mt-3">
                  <div
                    className={
                      nameIsRequiredError
                        ? "form-control is-invalid"
                        : "input-login-control mb-4"
                    }
                  ></div>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Name"
                    name="name"
                    maxLength="40"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                  />
                  {nameIsRequiredError && (
                    <div className="invalid-feedback mt-0">
                      Name is required
                    </div>
                  )}
                  {nameValidError && (
                    <div className="invalid-feedback mt-0">
                    Please enter your full name (first & last name).
                    </div>
                  )}
                </div>

                <div className="form-group mt-3">
                  <div
                    className={
                      roleIsRequiredError
                        ? "form-control is-invalid"
                        : "input-login-control mb-4"
                    }
                  ></div>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Role"
                    name="role"
                    value={role}
                    onChange={(e) => handleRole(e.target.value)}
                  />
                  {roleIsRequiredError && (
                    <div className="invalid-feedback">Role is required</div>
                  )}
                  {roleError && (
                    <div className="invalid-feedback">
                      Role must be a user Or admin
                    </div>
                  )}
                </div>

                <div className="form-group mt-3">
                  <div
                    className={
                      passwordIsRequiredError
                        ? "form-control is-invalid"
                        : "input-login-control mb-1"
                    }
                  ></div>
                  <div
                    className={
                      passworderror
                        ? "form-control is-invalid"
                        : "input-login-control mb-1"
                    }
                  ></div>
                  <div className="form-group mb-1">
                    <input
                      type={!isShowPassword ? "password" : "text"}
                      id="exampleInputtext"
                      aria-describedby="textHelp"
                      className="form-control"
                      placeholder="Enter Your Password"
                      maxLength="40"
                      name="password"
                      value={password}
                      onChange={(e) => handlePassword(e.target.value)}
                    />
                    <span>
                      {!isShowPassword ? (
                        <FaEye onClick={(e) => handleShowPassword(e, "show")} />
                      ) : (
                        <FaEyeSlash
                          onClick={(e) => handleShowPassword(e, "hide")}
                        />
                      )}
                    </span>
                  </div>
                  {passwordIsRequiredError && (
                    <div className="invalid-feedback">Password is required</div>
                  )}
                  {passworderror && (
                    <div className="invalid-feedback">
                      Please enter valid<br></br>
                      *Password Minimum eight characters <br></br>
                      *at least one uppercase letter [A-Z] <br></br>
                      *one lowercase letter [a-z]<br></br>
                      *one number [0-8] <br></br>
                      *and one special character [! @ # # $ % ^ & *]<br></br>
                    </div>
                  )}
                </div>

                <div className="form-group mt-3">
                  <div
                    className={
                      phoneIsRequiredError
                        ? "form-control is-invalid"
                        : "input-login-control mb-4"
                    }
                  ></div>
                  <input
                    className={
                      phoneError ? "form-control is-invalid" : "form-control"
                    }
                    id="exampleInputtext"
                    type="text"
                    aria-describedby="textHelp"
                    placeholder="Enter Your Number"
                    name="phone"
                    maxLength="10"
                    value={phone}
                    onChange={(e) => handleMobileChange(e.target.value)}
                  />
                  {phoneIsRequiredError && (
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
                <div className="form-group mt-3">
                  <div
                    className={
                      dobError ? "form-control is-invalid" : "form-control"
                    }
                  ></div>
                  <div
                    className={
                      dobIsRequiredError
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  ></div>
                  <input
                    className="form-control"
                    id="exampleInputtext"
                    type="date"
                    aria-describedby="textHelp"
                    placeholder="Enter Your Date Of Birth"
                    name="dob"
                    value={dob}
                    onChange={(e) => handleDateOfbirth(e.target.value)}
                  />
                  {dobIsRequiredError && (
                    <div className="invalid-feedback">
                      Date of birth is required
                    </div>
                  )}
                  {dobError && (
                    <div className="invalid-feedback">
                      Age above 12 year!
                    </div>
                  )}
                </div>
                <div className="form-group mt-3">
                  <div
                    className={
                      genderIsRequiredError
                        ? "form-control is-invalid"
                        : "input-login-control mb-4"
                    }
                  ></div>
                  <select
                    className="form-control"
                    type="text"
                    placeholder="Enter Your gender"
                    onChange={(e) => handleGender(e)}
                    value={gender}
                    // isSearchable={true}
                  >
                    <option value="">----Select Gender---</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {genderIsRequiredError && (
                    <div className="invalid-feedback">Gender is required</div>
                  )}
                </div>
                <div className="form-group mt-3">
                  <div
                    className={
                      addressIsRequiredError
                        ? "form-control is-invalid"
                        : "input-login-control mb-4"
                    }
                  ></div>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your address"
                    name="address"
                    maxLength="60"
                    value={address}
                    onChange={(e) => handleaddress(e.target.value)}
                  />
                  {addressIsRequiredError && (
                    <div className="invalid-feedback">Address is required</div>
                  )}
                </div>
                <div className="form-group mt-3">
                  <div
                    className={
                      zipcodeError
                        ? "form-control is-invalid"
                        : "input-login-control mb-4"
                    }
                  ></div>
                  <div
                    className={
                      zipcodeIsRequiredError
                        ? "form-control is-invalid"
                        : "input-login-control mb-4"
                    }
                  ></div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your zipcode"
                    name="zipcode"
                    maxLength="6"
                    value={zipcode}
                    onChange={(e) => handlezipcode(e.target.value)}
                  />
                  {zipcodeIsRequiredError && (
                    <div className="invalid-feedback">Zip is required</div>
                  )}
                  {zipcodeError && (
                    <div className="invalid-feedback">Please valid zipcode</div>
                  )}
                </div>
                <button class="btn btn-primary btn-lg active" type="submit">
                  Submit
                </button>

                <a
                  onClick={handleClose}
                  class="btn btn-secondary btn-lg active ml-3"
                  role="button"
                  aria-pressed="true"
                >
                  close
                </a>
              </form>
            </Modal.Body>

            <Modal.Footer></Modal.Footer>
          </Modal>

          {/* Model Box Finsihs */}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
export default Home;
