import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { adminResume } from "Service/auth";
import Select from "react-select";
import "./Style.scss";
import {
  FaUserAlt,
  FaBirthdayCake,
  FaArrowRight,
  // FaArrowLeft,
  FaEnvelope,
  FaPhone,
  // FaPen,
  // FaCamera,
  // FaUserCircle,
  FaPaperclip,
  // FaBriefcase,
  FaPlusCircle,
  FaEdit,
  FaTimes,
  FaCalendar,
  FaPen,
  FaCaretDown,
} from "react-icons/fa";

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
  const [job_title, setJob_Title] = useState("");
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [permAddress, setPermAddress] = useState("");
  const [cpAddress, setCpAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [placeOfbirth, setPlaceOfbirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [dateOfbirth, setDateOfbirth] = useState("");
  const [dobError, setdobError] = useState(false);
  const string = /^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/;

  const [employmentHistory, setemploymentHistory] = useState([
    {
      jobTitle: "",
      employer: "",
      startDate: "",
      endDate: "",
      isPresent: "",
      city: "",
      description: "",
    },
  ]);
  const [education, setEducation] = useState([
    {
      schoolName: "",
      degreeName: "",
      startDate: "",
      enddate: "",
      isPresent: "",
      description: "",
    },
  ]);
  const [socialLink, setSocialLink] = useState([
    {
      label: "",
      link: "",
    },
  ]);
  const [skills, setSkills] = useState([
    {
      skill: "",
      level: "",
    },
  ]);
  const [courses, setCourses] = useState([
    {
      course: "",
      institution: "",
      startDate: "",
      endDate: "",
      isPresent: "",
      description: "",
    },
  ]);
  const [internship, setInternship] = useState([
    {
      jobTitle: "",
      employer: "",
      startDate: "",
      endDate: "",
      isPresent: "",
      city: "",
      description: "",
    },
  ]);
  const [extraCurricularActivities, setExtraCurricularActivities] = useState([
    {
      functionTitle: "",
      employer: "",
      startDate: "",
      endDate: "",
      isPresent: "",
      city: "",
      description: "",
    },
  ]);

  const [hobbies, setHobbies] = useState([]);

  const optionList = [
    { value: "chess", label: "Chess" },
    { value: "badminton", label: "Badmintion" },
    { value: "cricket", label: "Cricket" },
    { value: "vollyball", label: "Vollyball" },
    { value: "hockey", label: "hockey" },
  ];

  const [languages, setLanguages] = useState([
    {
      language: "",
      level: "",
    },
  ]);

  const [references, setReferences] = useState([
    {
      refrentFullname: "",
      company: "",
      phone: "",
      email: "",
    },
  ]);

  const handleJob_Title = (value) => {
    setJob_Title(value);
  };
  const handleImage = (value) => {
    setImage(value);
  };
  const handleLastName = (value) => {
    setLastName(value);
  };
  const handleemail = (value) => {
    setEmail(value);
    const regex = /^[A-Za-z0-2._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
    if (regex.test(value) === false) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };
  const handleName = (value) => {
    setFirstName(value);
  };
  const handleMobileChange = (value) => {
    setPhone(value);
    const regex = /^\d{10}$/;
    if (regex.test(value) === false) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };
  const handleCountry = (value) => {
    setCountry(value);
  };
  const handleCity = (value) => {
    setCity(value);
  };
  const handlePermAddress = (value) => {
    setPermAddress(value);
  };
  const handleCpAddress = (value) => {
    setCpAddress(value);
  };
  const handlPostalCode = (value) => {
    setPostalCode(value);
  };
  const handleDrivingLicense = (value) => {
    setDrivingLicense(value);
  };
  const handlePlaceOfbirth = (value) => {
    setPlaceOfbirth(value);
  };
  const handleNationality = (value) => {
    setNationality(value);
  };
  const handleDateOfbirth = (value) => {
    setDateOfbirth(value);
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

  const handleHobbies = (value) => {
    console.log(value);
    const fstate = [];
    while (hobbies?.length > 0) {
      hobbies.pop();
    }
    for (let i = 0; i < value?.length; i++) {
      hobbies?.push(value[i].value);
    }

    console.log("filtered", hobbies);
  };

  const handleEmployChange = async (i, e) => {
    const value = [...employmentHistory];
    value[i][e.target.name] = e.target.value;
    setemploymentHistory(value);
  };

  const handleEducation = async (i, e) => {
    const value = [...education];
    value[i][e.target.name] = e.target.value;
    setEducation(value);
  };

  const handleSocialLink = async (i, e) => {
    const value = [...socialLink];
    value[i][e.target.name] = e.target.value;
    setSocialLink(value);
  };

  const handleSkills = async (i, e) => {
    const value = [...skills];
    value[i][e.target.name] = e.target.value;
    setSkills(value);
  };

  const handleCourses = async (i, e) => {
    const value = [...courses];
    value[i][e.target.name] = e.target.value;
    setCourses(value);
  };

  const handleInternship = async (i, e) => {
    const value = [...internship];
    value[i][e.target.name] = e.target.value;
    setInternship(value);
  };

  const handleExtraCurricularActivities = async (i, e) => {
    const value = [...extraCurricularActivities];
    value[i][e.target.name] = e.target.value;
    setExtraCurricularActivities(value);
  };

  const handleLanguages = async (i, e) => {
    const value = [...languages];
    value[i][e.target.name] = e.target.value;
    setLanguages(value);
  };

  const handleReferences = async (i, e) => {
    const value = [...references];
    value[i][e.target.name] = e.target.value;
    setReferences(value);
  };

  const handleAddEmployerFields = async () => {
    setemploymentHistory([
      ...employmentHistory,
      {
        jobTitle: "",
        employer: "",
        startDate: "",
        endDate: "",
        isPresent: "",
        city: "",
        description: "",
      },
    ]);
  };
  const removeEmployeRow = async (i) => {
    if (employmentHistory.length > 1) {
      employmentHistory.splice(i, 1);
      setemploymentHistory([...employmentHistory]);
    }
  };

  const handleEducationFields = async () => {
    setEducation([
      ...education,
      {
        schoolName: "",
        degreeName: "",
        startDate: "",
        enddate: "",
        isPresent: "",
        description: "",
      },
    ]);
  };
  const removeEducationeRow = async (i) => {
    if (education.length > 1) {
      education.splice(i, 1);
      setEducation([...education]);
    }
  };

  const handlesocialLinkFields = async () => {
    setSocialLink([...socialLink, { label: "", link: "" }]);
  };

  const removesocialLinkRow = async (i) => {
    if (socialLink.length > 1) {
      socialLink.splice(i, 1);
      setSocialLink([...socialLink]);
    }
  };

  const handleSkillsFields = async () => {
    setSkills([...skills, { skill: "", level: "" }]);
  };

  const removeskillsRow = async (i) => {
    if (skills.length > 1) {
      skills.splice(i, 1);
      setSkills([...skills]);
    }
  };

  const handlecoursesFields = async () => {
    setCourses([
      ...courses,
      {
        course: "",
        institution: "",
        jobTitle: "",
        employer: "",
        startDate: "",
        endDate: "",
        isPresent: "",
        city: "",
        description: "",
      },
    ]);
  };

  const removecoursesRow = async (i) => {
    if (courses.length > 1) {
      courses.splice(i, 1);
      setCourses([...courses]);
    }
  };

  const handleinternshipFields = async () => {
    setInternship([
      ...internship,
      {
        jobTitle: "",
        employer: "",
        startDate: "",
        endDate: "",
        isPresent: "",
        city: "",
        description: "",
      },
    ]);
  };

  const removeinternshipRow = async (i) => {
    if (internship.length > 1) {
      internship.splice(i, 1);
      setInternship([...internship]);
    }
  };

  const handleextraCurricularActivitiesFields = async () => {
    setExtraCurricularActivities([
      ...extraCurricularActivities,
      {
        schoolName: "",
        degreeName: "",
        startDate: "",
        enddate: "",
        isPresent: "",
        description: "",
      },
    ]);
  };

  const removeextraCurricularActivitiesRow = async (i) => {
    if (extraCurricularActivities.length > 1) {
      extraCurricularActivities.splice(i, 1);
      setExtraCurricularActivities([...extraCurricularActivities]);
    }
  };

  const handlelanguagesFields = async () => {
    setLanguages([...languages, { language: "", level: "" }]);
  };

  const removelanguagesRow = async (i) => {
    if (languages.length > 1) {
      languages.splice(i, 1);
      setLanguages([...languages]);
    }
  };

  const handlereferencesFields = async () => {
    setReferences([
      ...references,
      { refrentFullname: "", company: "", phone: "", email: "" },
    ]);
  };

  const removereferencesRow = async (i) => {
    if (references.length > 1) {
      references.splice(i, 1);
      setRreferences([...references]);
    }
  };

  const resume = async (e) => {
    e.preventDefault();

    const dat = {
      job_title: job_title,
      image: image,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      country: country,
      city: city,
      permAddress: permAddress,
      cpAddress: cpAddress,
      postalCode: postalCode,
      drivingLicense: drivingLicense,
      nationality: nationality,
      placeOfbirth: placeOfbirth,
      dateOfbirth: dateOfbirth,
      employmentHistory: employmentHistory,
      education: education,
      socialLink: socialLink,
      skills: skills,
      courses: courses,
      internship: internship,
      extraCurricularActivities: extraCurricularActivities,
      languages: languages,
      references: references,
      hobbies: hobbies,
    };
    const response = await adminResume(dat);
    console.log(response, "respoonse");
    if (response?.data?.code === 200) {
      localStorage.setItem("resObje1", JSON.stringify(response?.data?.data));
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
                <Card.Title as="h4">Manage Resume</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={resume}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <h6 className="text-uppercase">JOb Title</h6>
                        <Form.Control
                          id="exampleInputtext"
                          aria-describedby="textHelp"
                          placeholder="job_title"
                          type="text"
                          value={job_title}
                          onChange={(e) => handleJob_Title(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <h6>Image</h6>
                        <Form.Control
                          placeholder="image"
                          type="text"
                          value={image}
                          onChange={(e) => handleImage(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <h6>First Name</h6>
                        <Form.Control
                          placeholder="Enter your first name"
                          type="text"
                          value={firstName}
                          onChange={(e) => handleName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <h6>Last Name</h6>
                        <Form.Control
                          placeholder="Enter yourLast Name"
                          type="text"
                          value={lastName}
                          onChange={(e) => handleLastName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="8">
                      <Form.Group>
                        <h6>Email</h6>
                        <Form.Control
                          className={
                            emailError
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          id="exampleInputtext"
                          aria-describedby="textHelp"
                          placeholder="email"
                          type="email"
                          value={email}
                          onChange={(e) => handleemail(e.target.value)}
                        ></Form.Control>
                        {emailError && (
                          <div className="invalid-feedback">
                            Please enter valid email
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Mobile</h6>
                        <Form.Control
                          className={
                            phoneError
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          id="exampleInputtext"
                          aria-describedby="textHelp"
                          placeholder="Mobile"
                          type="number"
                          maxLength={10}
                          value={phone}
                          onChange={(e) => handleMobileChange(e.target.value)}
                        ></Form.Control>
                        {phoneError ? (
                          <div className="invalid-feedback">
                            Please enter valid Phone Number
                          </div>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>Country</h6>
                        <Form.Control
                          placeholder="Country"
                          type="text"
                          value={country}
                          onChange={(e) => handleCountry(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <h6>City</h6>
                        <Form.Control
                          placeholder="city"
                          type="text"
                          value={city}
                          onChange={(e) => handleCity(e.target.value)}
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
                          value={permAddress}
                          onChange={(e) => handlePermAddress(e.target.value)}
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
                          value={cpAddress}
                          onChange={(e) => handleCpAddress(e.target.value)}
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
                          value={postalCode}
                          onChange={(e) => handlPostalCode(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <h6>Driving License</h6>
                        <Form.Control
                          placeholder="Driving License"
                          type="text"
                          value={drivingLicense}
                          onChange={(e) => handleDrivingLicense(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <h6>Nationality</h6>
                        <Form.Control
                          placeholder="nationality"
                          type="text"
                          value={nationality}
                          onChange={(e) => handleNationality(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <h6>Place Of birth</h6>
                        <Form.Control
                          placeholder="place Of birth"
                          type="text"
                          value={placeOfbirth}
                          onChange={(e) => handlePlaceOfbirth(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <h6>Date Of birth</h6>
                        <Form.Control
                          className={
                            dobError
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          id="exampleInputtext"
                          aria-describedby="textHelp"
                          placeholder="place Of birth"
                          type="date"
                          value={dateOfbirth}
                          onChange={(e) => handleDateOfbirth(e.target.value)}
                        ></Form.Control>
                        {dobError && (
                          <div className="invalid-feedback">
                            Please valid date of birth
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <div className="app">
                        <h5>Select your Hobbies</h5>
                        <div className="dropdown-container">
                          <Select
                            options={optionList}
                            type="text"
                            placeholder="Select color"
                            // value={hobbies}
                            onChange={(e) => handleHobbies(e)}
                            isSearchable={true}
                            isMulti
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5>Employment History</h5>
                            <div className="editDetail">
                              <a
                                className="btn addBtn"
                                type="button"
                                onClick={handleAddEmployerFields}
                              >
                                <span>
                                  <FaPlusCircle />
                                </span>
                                Add
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {employmentHistory.map((identificationField, i) => {
                        return (
                          <>
                            <div className="text-center">
                              <span
                                className="closeBtn"
                                onClick={(e) => removeEmployeRow(i)}
                              >
                                <FaTimes />
                              </span>
                            </div>
                            <Row>
                              <Col className="pr-1" md="4">
                                <Form.Group>
                                  <h6>Job Title</h6>
                                  <Form.Control
                                    placeholder="jobTitle"
                                    type="text"
                                    name="jobTitle"
                                    value={identificationField.jobTitle}
                                    onChange={(e) => handleEmployChange(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="px-1" md="4">
                                <Form.Group>
                                  <h6>Employer</h6>
                                  <Form.Control
                                    placeholder="employer"
                                    type="text"
                                    name="employer"
                                    value={identificationField.employer}
                                    onChange={(e) => handleEmployChange(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="4">
                                <Form.Group>
                                  <h6>Start Date</h6>
                                  <Form.Control
                                    placeholder="start Date"
                                    type="date"
                                    name="startDate"
                                    value={identificationField.startDate}
                                    onChange={(e) => handleEmployChange(i, e)}
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
                                    name="endDate"
                                    value={identificationField.endDate}
                                    onChange={(e) => handleEmployChange(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="px-1" md="4">
                                <Form.Group>
                                  <h6>Is Present</h6>
                                  <Form.Control
                                    placeholder="Is Present"
                                    type="text"
                                    name="isPresent"
                                    value={identificationField.isPresent}
                                    onChange={(e) => handleEmployChange(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="4">
                                <Form.Group>
                                  <h6>City</h6>
                                  <Form.Control
                                    placeholder="City"
                                    type="text"
                                    name="city"
                                    value={identificationField.city}
                                    onChange={(e) => handleEmployChange(i, e)}
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
                                    name="description"
                                    value={identificationField.description}
                                    onChange={(e) => handleEmployChange(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                            </Row>
                          </>
                        );
                      })}
                    </div>
                  </div>

                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5>Education History</h5>
                            <div className="editDetail">
                              <a
                                className="btn addBtn"
                                type="button"
                                onClick={handleEducationFields}
                              >
                                <span>
                                  <FaPlusCircle />
                                </span>
                                Add
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {education.map((educationField, i) => {
                        return (
                          <>
                            <div className="text-center">
                              <span
                                className="closeBtn"
                                onClick={(e) => removeEducationeRow(i)}
                              >
                                <FaTimes />
                              </span>
                            </div>
                            <Row>
                              <Col className="pr-1" md="4">
                                <Form.Group>
                                  <h6>School Name</h6>
                                  <Form.Control
                                    placeholder="School Name"
                                    type="text"
                                    name="schoolName"
                                    value={educationField.schoolName}
                                    onChange={(e) => handleEducation(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="px-1" md="4">
                                <Form.Group>
                                  <h6>Degree Name</h6>
                                  <Form.Control
                                    placeholder="Degree Name"
                                    type="text"
                                    name="degreeName"
                                    value={educationField.degreeName}
                                    onChange={(e) => handleEducation(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="4">
                                <Form.Group>
                                  <h6>Start Date</h6>
                                  <Form.Control
                                    placeholder="start Date"
                                    type="date"
                                    name="startDate"
                                    value={educationField.startDate}
                                    onChange={(e) => handleEducation(i, e)}
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
                                    name="enddate"
                                    value={educationField.enddate}
                                    onChange={(e) => handleEducation(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="px-1" md="4">
                                <Form.Group>
                                  <h6>Is Present</h6>
                                  <Form.Control
                                    placeholder="Is Present"
                                    type="text"
                                    name="isPresent"
                                    value={educationField.isPresent}
                                    onChange={(e) => handleEducation(i, e)}
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
                                    name="description"
                                    value={educationField.description}
                                    onChange={(e) => handleEducation(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                            </Row>
                          </>
                        );
                      })}
                    </div>
                  </div>

                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5> Social Link </h5>
                            <div className="editDetail">
                              <a
                                className="btn addBtn"
                                type="button"
                                onClick={handlesocialLinkFields}
                              >
                                <span>
                                  <FaPlusCircle />
                                </span>
                                Add
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {socialLink.map((socialLinkField, i) => {
                        return (
                          <>
                            <div className="text-center">
                              <span
                                className="closeBtn"
                                onClick={(e) => removesocialLinkRow(i)}
                              >
                                <FaTimes />
                              </span>
                            </div>
                            <Row>
                              <Col className="pr-1" md="4">
                                <Form.Group>
                                  <h6>Label</h6>
                                  <Form.Control
                                    placeholder="Gmail"
                                    type="text"
                                    name="label"
                                    value={socialLinkField.label}
                                    onChange={(e) => handleSocialLink(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="px-1" md="4">
                                <Form.Group>
                                  <h6>link</h6>
                                  <Form.Control
                                    placeholder="LinkedIn profile"
                                    type="text"
                                    name="link"
                                    value={socialLinkField.link}
                                    onChange={(e) => handleSocialLink(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                            </Row>
                          </>
                        );
                      })}
                    </div>
                  </div>

                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5> Skills </h5>
                            <div className="editDetail">
                              <a
                                className="btn addBtn"
                                type="button"
                                onClick={handleSkillsFields}
                              >
                                <span>
                                  <FaPlusCircle />
                                </span>
                                Add
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {skills.map((skillsField, i) => {
                        return (
                          <>
                            <div className="text-center">
                              <span
                                className="closeBtn"
                                onClick={(e) => removeskillsRow(i)}
                              >
                                <FaTimes />
                              </span>
                            </div>
                            <Row>
                              <Col className="pr-1" md="4">
                                <Form.Group>
                                  <h6>Skill Name</h6>
                                  <Form.Control
                                    placeholder="Skill Name"
                                    type="text"
                                    name="skill"
                                    value={skillsField.skill}
                                    onChange={(e) => handleSkills(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="px-1" md="4">
                                <Form.Group>
                                  <h6>Level</h6>
                                  <Form.Control
                                    placeholder="level in numbers"
                                    type="number"
                                    name="level"
                                    value={skillsField.level}
                                    onChange={(e) => handleSkills(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                            </Row>
                          </>
                        );
                      })}
                    </div>
                  </div>

                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5> Courses </h5>
                            <div className="editDetail">
                              <a
                                className="btn addBtn"
                                type="button"
                                onClick={handlecoursesFields}
                              >
                                <span>
                                  <FaPlusCircle />
                                </span>
                                Add
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {courses.map((coursesField, i) => {
                        return (
                          <>
                            <div className="text-center">
                              <span
                                className="closeBtn"
                                onClick={(e) => removecoursesRow(i)}
                              >
                                <FaTimes />
                              </span>
                            </div>
                            <Row>
                              <Col className="pr-1" md="4">
                                <Form.Group>
                                  <h6>Course Name</h6>
                                  <Form.Control
                                    placeholder="Course Name"
                                    type="text"
                                    name="course"
                                    value={coursesField.course}
                                    onChange={(e) => handleCourses(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="px-1" md="4">
                                <Form.Group>
                                  <h6>Institution</h6>
                                  <Form.Control
                                    placeholder="Institution"
                                    type="text"
                                    name="institution"
                                    value={coursesField.institution}
                                    onChange={(e) => handleCourses(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="4">
                                <Form.Group>
                                  <h6>Start Date</h6>
                                  <Form.Control
                                    placeholder="start Date"
                                    type="date"
                                    name="startDate"
                                    value={coursesField.startDate}
                                    onChange={(e) => handleCourses(i, e)}
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
                                    name="endDate"
                                    value={coursesField.endDate}
                                    onChange={(e) => handleCourses(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="px-1" md="4">
                                <Form.Group>
                                  <h6>Is Present</h6>
                                  <Form.Control
                                    placeholder="Is Present"
                                    type="text"
                                    name="isPresent"
                                    value={coursesField.isPresent}
                                    onChange={(e) => handleCourses(i, e)}
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
                                    name="description"
                                    value={coursesField.description}
                                    onChange={(e) => handleCourses(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                            </Row>
                          </>
                        );
                      })}
                    </div>
                  </div>

                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5> Internship </h5>
                            <div className="editDetail">
                              <a
                                style={{ float: "right" }}
                                className="btn addBtn row-12"
                                type="button"
                                onClick={handleinternshipFields}
                              >
                                <span>
                                  <FaPlusCircle />
                                </span>
                                Add
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {internship.map((internshipField, i) => {
                        return (
                          <>
                            <div className="text-center">
                              <span
                                className="closeBtn"
                                onClick={(e) => removeinternshipRow(i)}
                              >
                                <FaTimes />
                              </span>
                            </div>
                            <Row>
                              <Col className="pr-1" md="4">
                                <Form.Group>
                                  <h6>Job Title</h6>
                                  <Form.Control
                                    placeholder="jobTitle"
                                    type="text"
                                    name="jobTitle"
                                    value={internshipField.jobTitle}
                                    onChange={(e) => handleInternship(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="px-1" md="4">
                                <Form.Group>
                                  <h6>Employer</h6>
                                  <Form.Control
                                    placeholder="Employer"
                                    type="text"
                                    name="employer"
                                    value={internshipField.employer}
                                    onChange={(e) => handleInternship(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="4">
                                <Form.Group>
                                  <h6>Start Date</h6>
                                  <Form.Control
                                    placeholder="start Date"
                                    type="date"
                                    name="startDate"
                                    value={internshipField.startDate}
                                    onChange={(e) => handleInternship(i, e)}
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
                                    name="endDate"
                                    value={internshipField.endDate}
                                    onChange={(e) => handleInternship(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="px-1" md="4">
                                <Form.Group>
                                  <h6>Is Present</h6>
                                  <Form.Control
                                    placeholder="Is Present"
                                    type="text"
                                    name="isPresent"
                                    value={internshipField.isPresent}
                                    onChange={(e) => handleInternship(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-1" md="4">
                                <Form.Group>
                                  <h6>city</h6>
                                  <Form.Control
                                    placeholder="City Name"
                                    type="text"
                                    name="city"
                                    value={internshipField.city}
                                    onChange={(e) => handleInternship(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="pr-1" md="4">
                                <Form.Group>
                                  <h6>Description</h6>
                                  <Form.Control
                                    placeholder="Description"
                                    type="text"
                                    name="description"
                                    value={internshipField.description}
                                    onChange={(e) => handleInternship(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                            </Row>
                          </>
                        );
                      })}
                    </div>
                  </div>

                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5> Extra Curricular Activities </h5>
                            <div className="editDetail">
                              <a
                                className="btn addBtn"
                                type="button"
                                onClick={handleextraCurricularActivitiesFields}
                              >
                                <span>
                                  <FaPlusCircle />
                                </span>
                                Add
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {extraCurricularActivities.map(
                        (extraCurricularActivitiesField, i) => {
                          return (
                            <>
                              <div className="text-center">
                                <span
                                  className="closeBtn"
                                  onClick={(e) =>
                                    removeextraCurricularActivitiesRow(i)
                                  }
                                >
                                  <FaTimes />
                                </span>
                              </div>
                              <Row>
                                <Col className="pr-1" md="4">
                                  <Form.Group>
                                    <h6>Function Title</h6>
                                    <Form.Control
                                      placeholder="function Title"
                                      type="text"
                                      name="functionTitle"
                                      value={
                                        extraCurricularActivitiesField.functionTitle
                                      }
                                      onChange={(e) =>
                                        handleExtraCurricularActivities(i, e)
                                      }
                                    ></Form.Control>
                                  </Form.Group>
                                </Col>
                                <Col className="px-1" md="4">
                                  <Form.Group>
                                    <h6>Employer</h6>
                                    <Form.Control
                                      placeholder="Employer"
                                      type="text"
                                      name="employer"
                                      value={
                                        extraCurricularActivitiesField.employer
                                      }
                                      onChange={(e) =>
                                        handleExtraCurricularActivities(i, e)
                                      }
                                    ></Form.Control>
                                  </Form.Group>
                                </Col>
                                <Col className="pl-1" md="4">
                                  <Form.Group>
                                    <h6>Start Date</h6>
                                    <Form.Control
                                      placeholder="start Date"
                                      type="date"
                                      name="startDate"
                                      value={
                                        extraCurricularActivitiesField.startDate
                                      }
                                      onChange={(e) =>
                                        handleExtraCurricularActivities(i, e)
                                      }
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
                                      name="endDate"
                                      value={
                                        extraCurricularActivitiesField.endDate
                                      }
                                      onChange={(e) =>
                                        handleExtraCurricularActivities(i, e)
                                      }
                                    ></Form.Control>
                                  </Form.Group>
                                </Col>
                                <Col className="px-1" md="4">
                                  <Form.Group>
                                    <h6>Is Present</h6>
                                    <Form.Control
                                      placeholder="Is Present"
                                      type="text"
                                      name="isPresent"
                                      value={
                                        extraCurricularActivitiesField.isPresent
                                      }
                                      onChange={(e) =>
                                        handleExtraCurricularActivities(i, e)
                                      }
                                    ></Form.Control>
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Row>
                                <Col className="pr-1" md="4">
                                  <Form.Group>
                                    <h6>city</h6>
                                    <Form.Control
                                      placeholder="City Name"
                                      type="text"
                                      name="city"
                                      value={
                                        extraCurricularActivitiesField.city
                                      }
                                      onChange={(e) =>
                                        handleExtraCurricularActivities(i, e)
                                      }
                                    ></Form.Control>
                                  </Form.Group>
                                </Col>
                                <Col className="pr-1" md="4">
                                  <Form.Group>
                                    <h6>Description</h6>
                                    <Form.Control
                                      placeholder="Description"
                                      type="text"
                                      name="description"
                                      value={
                                        extraCurricularActivitiesField.description
                                      }
                                      onChange={(e) =>
                                        handleExtraCurricularActivities(i, e)
                                      }
                                    ></Form.Control>
                                  </Form.Group>
                                </Col>
                              </Row>
                            </>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5> Languages </h5>
                            <div className="editDetail">
                              <a
                                className="btn addBtn"
                                type="button"
                                onClick={handlelanguagesFields}
                              >
                                <span>
                                  <FaPlusCircle />
                                </span>
                                Add
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {languages.map((languagesField, i) => {
                        return (
                          <>
                            <div className="text-center">
                              <span
                                className="closeBtn"
                                onClick={(e) => removelanguagesRow(i)}
                              >
                                <FaTimes />
                              </span>
                            </div>
                            <Row>
                              <Col className="pr-1" md="4">
                                <Form.Group>
                                  <h6>Skill Name</h6>
                                  <Form.Control
                                    placeholder="Skill Name"
                                    type="text"
                                    name="language"
                                    value={languagesField.language}
                                    onChange={(e) => handleLanguages(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="px-1" md="4">
                                <Form.Group>
                                  <h6>Level</h6>
                                  <Form.Control
                                    placeholder="level in numbers"
                                    type="number"
                                    name="level"
                                    value={languagesField.level}
                                    onChange={(e) => handleLanguages(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                            </Row>
                          </>
                        );
                      })}
                    </div>
                  </div>

                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5> References </h5>
                            <div className="editDetail">
                              <a
                                className="btn addBtn"
                                type="button"
                                onClick={handlereferencesFields}
                              >
                                <span>
                                  <FaPlusCircle />
                                </span>
                                Add
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {references.map((referencesField, i) => {
                        return (
                          <>
                            <div className="text-center">
                              <span
                                className="closeBtn"
                                onClick={(e) => removereferencesRow(i)}
                              >
                                <FaTimes />
                              </span>
                            </div>
                            <Row>
                              <Col className="pr-1" md="4">
                                <Form.Group>
                                  <h6>Refrent Fullname</h6>
                                  <Form.Control
                                    placeholder="Refrent Fullname"
                                    type="text"
                                    name="refrentFullname"
                                    value={referencesField.refrentFullname}
                                    onChange={(e) => handleReferences(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="px-1" md="4">
                                <Form.Group>
                                  <h6>Company</h6>
                                  <Form.Control
                                    placeholder="company"
                                    type="text"
                                    name="company"
                                    value={referencesField.company}
                                    onChange={(e) => handleReferences(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="pr-1" md="4">
                                <Form.Group>
                                  <h6>Phone Number</h6>
                                  <Form.Control
                                    placeholder="phone"
                                    type="number"
                                    name="phone"
                                    value={referencesField.phone}
                                    onChange={(e) => handleReferences(i, e)}
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
                                    name="email"
                                    value={referencesField.email}
                                    onChange={(e) => handleReferences(i, e)}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                            </Row>
                          </>
                        );
                      })}
                    </div>
                  </div>

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
