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
import Pagination from "react-js-pagination";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaEnvelope, FaEyeSlash, FaEye } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { resumeList, deleteResumeById } from "Service/auth";
import Swal from "sweetalert2";
import "./Style.scss";

function HomePage() {
  const history = useHistory();

  const token = localStorage.getItem("token");
  const [resume, setresume] = useState([]);
  const [iserror, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [page, setPageNo] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  
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

  const getData = async (pageNo) => {
    const requestedData = {
      limit: 10,
      page: pageNo,
    };
    const response = await resumeList(requestedData);
    console.log("resumeList", response);
    setresume(response?.data?.data?.results);
    setTotalItemsCount(response?.data?.data?.totalResults);
  };

  const handlePageChange = (pageNumber) => {
    // pageNo = pageNumber;
    setPageNo(pageNumber);
    getData(pageNumber);
    
  };

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
        deleteresumetItems(id);
      }
    });
  };

  const deleteresumetItems = async (id) => {
    const response = await deleteResumeById(id);
    console.log("del", response);
    if (response?.data?.code === 200) {
      toast.success(response?.data?.message, "green");
      getData();
    } else {
      // alert(ress.data.message)
      toast.error(response?.data?.message, "red");
      setIsError(true);
      setError(response?.data?.message);
      setTimeout(() => {
        setIsError(false);
      }, 5000);
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
                  placeholder="Search Resume"
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
              <b>Resume Details</b>
            </h2>
          </div>

          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <button
              onClick={() => {
                history.push("/admin/createresume");
              }}
              type="submit"
              class="btn btn-primary"
              data-toggle="button"
              aria-pressed="false"
              autocomplete="off"
            >
              Create Resume
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
                      
                        <th className="border-0">First Name</th>
                        <th className="border-0">Email </th>
                        <th className="border-0">City  </th>
                        <th className="border-0">Country</th>
                        <th className="border-0">Nationality</th>
                        <th className="border-0">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {resume?.map((resumes, index) => ( 
                        <tr>
                          <th>{index + 1}</th>
                          
                          <td>{resumes?.firstName.slice(0, 10)}</td>
                          <td>{resumes?.email}</td>
                          <td>{resumes?.city.slice(0, 10)}</td>
                          <td>{resumes?.country.slice(0, 10)}</td>
                          <td>{resumes?.nationality.slice(0, 10)}</td>
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
                                    history.push(`editresume/${resumes?.id}`);
                                  }}
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    history.push(`showeresume/${resumes?.id}`);
                                  }}
                                >
                                  View
                                </Dropdown.Item>
                                <Dropdown.Item
                          
                                  onClick={() => deleteList(resumes?.id)}
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
              {resume.length !== 0 && (
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

          {/* <ReactPaginate
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
          /> */}
        </Container>
      </div>
    </div>
  );
}
export default HomePage;
