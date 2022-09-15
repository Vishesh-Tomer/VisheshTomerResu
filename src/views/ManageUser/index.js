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
import { adminUserAdd, adminUserCreate, deleteUserById } from "Service/auth";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import "./userStyle.scss";

function Home() {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

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

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await adminUserAdd();
      console.log("getAdmin", response);
      setUsers(response?.data?.results);
      const dataa = response?.data?.results;
      setPageCount(Math.ceil(dataa.length / perPage));
      setUsers(dataa.slice(offset, offset + perPage));
    };
    getData();
  }, [offset]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log(selectedPage * perPage);

    setOffset((selectedPage + 1) * perPage);
  };

  console.log("setAdminInfo", users);

  const [email, setemail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [name, setname] = useState("");
  const [role, setrole] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [dob, setdob] = useState("");
  const [dobError, setdobError] = useState(false);
  const [gender, setgender] = useState("");
  const [address, setaddress] = useState("");
  const [zipcode, setzipcode] = useState("");

  const handleName = (value) => {
    setname(value);
  };

  const handleRole = (value) => {
    setrole(value);
  };

  const handlePassword = (value) => {
    setpassword(value);
  };

  const handleGender = (value) => {
    setgender(value);
  };

  const handleaddress = (value) => {
    setaddress(value);
  };

  const handlezipcode = (value) => {
    setzipcode(value);
  };

  const handleemail = (value) => {
    setemail(value);
    const regex = /^[A-Za-z0-2._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
    if (regex.test(value) === false) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleMobileChange = (value) => {
    setphone(value);
    const regex = /^\d{10}$/;
    if (regex.test(value) === false) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
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
    if (age >= 18) {
      setdobError(false);
    } else {
      setdobError(true);
    }
  };

  const login = async (e) => {
    e.preventDefault();

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
    if (response?.data.user?.code === 200) {
      localStorage.setItem(
        "token",
        response?.data?.data?.tokens?.refresh.token
      );
      localStorage.setItem(
        "resObject",
        JSON.stringify(response?.data?.user?.data)
      );
      toast.success(response?.data?.user?.message);
    } else {
      toast.error(response?.data?.user?.message);
    }
  };

  const deleteListItems = async (id) => {
    const response = await deleteUserById(id);
    console.log("del", response);
    if (response.code === 200) {
      toast.success(response.message, "green");
    } else {
      toast.error(response.message, "red");
    }
  };

  return (
    <div className="container ">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row ">
          <div className="col-sm-3 mt-5 mb-4 text-gred">
            <div>Bluck actions:</div>
            <div>
              <select
              // name="pending"
              // id="pending"
              // onChange={handleCategoryChange}
              >
                <option value="">All</option>
                <option value="active">active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="search">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
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
            <Button variant="primary" onClick={handleShow}>
              Add New User
            </Button>
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
                      {users.map((user, index) => (
                        <tr>
                          <th>{index + 1}</th>
                          <td>{user?.email}</td>
                          <td>{user?.name}</td>
                          <td>{user?.role}</td>
                          <td>{user?.phone}</td>
                          <td>{user?.dob}</td>
                          <td>{user?.gender}</td>
                          <td>{user?.address}</td>
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
                                  href="#pablo"
                                  onClick={() => {
                                    history.push(`/edituser/${user?.id}`);
                                  }}
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#pablo"
                                  onClick={() => {
                                    history.push(`/edituser/${user?.id}`);
                                  }}
                                >
                                  View
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#pablo"
                                  onClick={() => deleteListItems(user?.id)}
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
            </Col>
          </Row>
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
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
                <div className="form-group">
                  <input
                    className={
                      emailError ? "form-control is-invalid" : "form-control"
                    }
                    id="exampleInputtext"
                    aria-describedby="textHelp"
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => handleemail(e.target.value)}
                  />
                  {emailError && (
                    <div className="invalid-feedback">
                      Please enter valid email
                    </div>
                  )}
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Name"
                    name="name"
                    value={name}
                    onChange={(e) => handleName(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Role"
                    name="role"
                    value={role}
                    onChange={(e) => handleRole(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Your Password"
                    name="password"
                    value={password}
                    onChange={(e) => handlePassword(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    className={
                      phoneError ? "form-control is-invalid" : "form-control"
                    }
                    id="exampleInputtext"
                    type="number"
                    aria-describedby="textHelp"
                    placeholder="Enter Your Number"
                    name="phone"
                    value={phone}
                    onChange={(e) => handleMobileChange(e.target.value)}
                  />
                  {phoneError ? (
                    <div className="invalid-feedback">
                      Please enter valid Phone Number
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group mt-3">
                  <input
                    className={
                      dobError ? "form-control is-invalid" : "form-control"
                    }
                    id="exampleInputtext"
                    type="date"
                    aria-describedby="textHelp"
                    placeholder="Enter Your Date Of Birth"
                    name="dob"
                    value={dob}
                    onChange={(e) => handleDateOfbirth(e.target.value)}
                  />
                  {dobError && (
                    <div className="invalid-feedback">
                      Please valid date of birth
                    </div>
                  )}
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => handleGender(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your address"
                    name="address"
                    value={address}
                    onChange={(e) => handleaddress(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Your zipcode"
                    name="zipcode"
                    value={zipcode}
                    onChange={(e) => handlezipcode(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-success mt-4">
                  Add Record
                </button>
                <ToastContainer />
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Model Box Finsihs */}
        </div>
      </div>
    </div>
  );
}
export default Home;
