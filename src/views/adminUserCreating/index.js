import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { adminResume } from "Service/auth";

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

  const [values, setValues] = useState({
    job_title: "",
    image: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    permAddress: "",
    cpAddress: "",
    postalCode: "",
    drivingLicense: "",
    nationality: "",
    placeOfbirth: "",
    dateOfbirth: "",
    employmentHistory: "",
    jobTitle: "",
    employer: "",
    startDate: "",
    endDate: "",
    isPresent: "",
    city: "",
    description: "",
    schoolName: "",
    degreeName: "",
    startDate: "",
    enddate: "",
    isPresent: "",
    description: "",
    label: "",
    link: "",
    skill: "",
    level: "",
    course: "",
    institution: "",
    jobTitle: "",
    employer: "",
    startDate: "",
    endDate: "",
    isPresent: "",
    city: "",
    description: "",
    schoolName: "",
    degreeName: "",
    startDate: "",
    enddate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const resume = async (e) => {
    e.preventDefault();
    const response = await adminResume(values);
    console.log(response, "respoonse");
    if (response?.data.admin) {
      history.push("/dashboard");
      localStorage.setItem("token", response?.data?.data?.token);
      localStorage.setItem("resObj", JSON.stringify(response?.data?.user_info));
      history.push("/dashboard");
      toast.success(response?.data?.message);
    } else {
      toast.error(response?.data?.message);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Admin User Creating</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={resume}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <h6 class="text-uppercase">JOb Title</h6>
                        <Form.Control
                          placeholder="job_title"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <h6>Image</h6>
                        <Form.Control
                          placeholder="image"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <h6>First Name</h6>
                        <Form.Control
                          placeholder="Company"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <h6>Last Name</h6>
                        <Form.Control
                          placeholder="Last Name"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="8">
                      <Form.Group>
                        <h6>Email</h6>
                        <Form.Control
                          placeholder="email"
                          type="email"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Mobile</h6>
                        <Form.Control
                          placeholder="Mobile"
                          type="number"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Country</h6>
                        <Form.Control
                          placeholder="Country"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>City</h6>
                        <Form.Control
                          placeholder="city"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <h6>Permanent Address</h6>
                        <Form.Control
                          placeholder="Home Address"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <h6>Correspondence Address</h6>
                        <Form.Control
                          placeholder="Home Address"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Postal Code</h6>
                        <Form.Control
                          placeholder="Postal Code"
                          type="number"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <h6>Driving License</h6>
                        <Form.Control
                          placeholder="Driving License"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <h6>Nationality</h6>
                        <Form.Control
                          placeholder="nationality"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <h6>Place Of birth</h6>
                        <Form.Control
                          placeholder="place Of birth"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <h5 class="badge badge-primary text-wrap">
                          Employment History
                        </h5>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Job Title</h6>
                        <Form.Control
                          placeholder="jobTitle"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <h6>Employer</h6>
                        <Form.Control
                          placeholder="employer"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <h6>Start Date</h6>
                        <Form.Control
                          placeholder="start Date"
                          type="date"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>End Date</h6>
                        <Form.Control
                          placeholder="End Date"
                          type="date"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <h6>Is Present</h6>
                        <Form.Control
                          placeholder="Is Present"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <h6>City</h6>
                        <Form.Control
                          placeholder="City"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Description</h6>
                        <Form.Control
                          placeholder="Description"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <h5 class="badge badge-primary text-wrap">
                          Education History
                        </h5>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>School Name</h6>
                        <Form.Control
                          placeholder="School Name"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <h6>Degree Name</h6>
                        <Form.Control
                          placeholder="Degree Name"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <h6>Start Date</h6>
                        <Form.Control
                          placeholder="start Date"
                          type="date"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>End Date</h6>
                        <Form.Control
                          placeholder="End Date"
                          type="date"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <h6>Is Present</h6>
                        <Form.Control
                          placeholder="Is Present"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Description</h6>
                        <Form.Control
                          placeholder="Description"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <h5 class="badge badge-primary text-wrap">
                          Social Link
                        </h5>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Label</h6>
                        <Form.Control
                          placeholder="Gmail"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <h6>link</h6>
                        <Form.Control
                          placeholder="LinkedIn profile"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <h5 class="badge badge-primary text-wrap">Skills</h5>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Skill Name</h6>
                        <Form.Control
                          placeholder="Skill Name"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <h6>Level</h6>
                        <Form.Control
                          placeholder="level in numbers"
                          type="number"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <h5 class="badge badge-primary text-wrap">Courses</h5>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Course Name</h6>
                        <Form.Control
                          placeholder="Course Name"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <h6>Institution</h6>
                        <Form.Control
                          placeholder="Institution"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <h6>Start Date</h6>
                        <Form.Control
                          placeholder="start Date"
                          type="date"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>End Date</h6>
                        <Form.Control
                          placeholder="End Date"
                          type="date"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <h6>Is Present</h6>
                        <Form.Control
                          placeholder="Is Present"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Description</h6>
                        <Form.Control
                          placeholder="Description"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <h5 class="badge badge-primary text-wrap">
                          Extra Curricular Activities
                        </h5>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Function Title</h6>
                        <Form.Control
                          placeholder="function Title"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <h6>Employer</h6>
                        <Form.Control
                          placeholder="Employer"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <h6>Start Date</h6>
                        <Form.Control
                          placeholder="start Date"
                          type="date"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>End Date</h6>
                        <Form.Control
                          placeholder="End Date"
                          type="date"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <h6>Is Present</h6>
                        <Form.Control
                          placeholder="Is Present"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Description</h6>
                        <Form.Control
                          placeholder="Description"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h5 class="badge badge-primary text-wrap">Hobbies</h5>
                        <Form.Control
                          placeholder="function Title"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <h5 class="badge badge-primary text-wrap">Languages</h5>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Skill Name</h6>
                        <Form.Control
                          placeholder="Skill Name"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <h6>Level</h6>
                        <Form.Control
                          placeholder="level in numbers"
                          type="number"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <h5 class="badge badge-primary text-wrap">
                          References
                        </h5>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Refrent Fullname</h6>
                        <Form.Control
                          placeholder="Refrent Fullname"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <h6>Company</h6>
                        <Form.Control
                          placeholder="company"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Phone Number</h6>
                        <Form.Control
                          placeholder="phone"
                          type="number"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Email</h6>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                          name="name"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
