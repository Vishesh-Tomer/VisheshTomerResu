
import { Button, Modal, Input, Container, Row, Col, Card, Table } from "react-bootstrap";
import React, { useEffect, useState, useMemo } from "react";
import { adminUserAdd, adminUserCreate, deleteUserById } from "Service/auth";
import { useHistory } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Pagination from './Pagination';

let PageSize = 10;

function Home() {


  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem("token")

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
          
      };
      getData();
    }, []);
    console.log("setAdminInfo",users);

    const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return users.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    


  const [values, setValues] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const login = async (e) => {
    e.preventDefault();
    const response = await adminUserCreate(values);
     console.log(response, "respoonse");
    if (response?.data.user?.code === 200) {
      localStorage.setItem("token", response?.data?.data?.tokens?.refresh.token);
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
          <div  >Bluck actions:
          </div>
        <div >
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
                <Card.Title as="h4">Striped Table with Hover</Card.Title>
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
              {currentTableData.map((user, index) => (
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
                  <Link
                    className="btn btn-outline-primary"
                    onClick={() => {
                        history.push(`/edituser/${user?.id}`)
                      }}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteListItems(user?.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
              ))}
          </tbody>
                </Table>
                <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={users.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
        {/* <div className="row">
          <div className="table-responsive ">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
              <th>#</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Role </th>
                  <th>phone </th>
                  <th>Date of Birth</th>
                  <th>Gender </th>
                  <th>Address</th>
                  <th>Zipcode </th>
                  <th>Action</th>
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
                  <Link
                    className="btn btn-outline-primary"
                    onClick={() => {
                        history.push(`/edituser/${user?.id}`)
                      }}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteListItems(user?.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
              ))}
          </tbody>
            </table>
          </div>
        </div> */}

        {/* <!--- Model Box ---> */}
        <div className="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              <span className="pl-2">Add Employee</span>
            </button> 
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={login}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your Email"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Name"
                    name="name"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Role"
                    name="role"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Your Password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="number"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your Number"
                    name="phone"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="date"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your Date Of Birth"
                    name="dob"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your gender"
                    name="gender"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your address"
                    name="address"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Your zipcode"
                    name="zipcode"
                    onChange={handleChange}
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
