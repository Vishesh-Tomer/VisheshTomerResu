import React, { useState, useEffect } from "react";
import Profile from "../../assets/img/user.png";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { adminResume, updateResume, GetResumeById } from "Service/auth";
import Select from "react-select";
import moment from "moment";
import { FaPlusCircle, FaTimes, FaPen } from "react-icons/fa";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

function User() {
  const history = useHistory();
  const { id } = useParams();
  const [job_title, setJob_Title] = useState("");
  const [job_titlelIsRequiredError, setjob_titleIsRequiredlError] =
    useState(false);
  const [image, setImage] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imagelIsRequiredError, setimageIsRequiredlError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNamelIsRequiredError, setfirstNameIsRequiredlError] =
    useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNamelIsRequiredError, setlastNameIsRequiredlError] =
    useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emaillIsRequiredError, setemailIsRequiredlError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [phonelIsRequiredError, setPhoneIsRequiredlError] = useState(false);
  const [country, setCountry] = useState("");
  const [countrylIsRequiredError, setcountryIsRequiredlError] = useState(false);
  const [city, setCity] = useState("");
  const [citylIsRequiredError, setcityIsRequiredlError] = useState(false);
  const [permAddress, setPermAddress] = useState("");
  const [permAddresslIsRequiredError, setpermAddressIsRequiredlError] =
    useState(false);
  const [cpAddress, setCpAddress] = useState("");
  const [cpAddresslIsRequiredError, setcpAddressIsRequiredlError] =
    useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [postalCodelIsRequiredError, setpostalCodeIsRequiredlError] =
    useState(false);
  const [drivingLicense, setDrivingLicense] = useState("");
  const [drivingLicenselIsRequiredError, setdrivingLicenseIsRequiredlError] =
    useState(false);
  const [placeOfbirth, setPlaceOfbirth] = useState("");
  const [placeOfbirthlIsRequiredError, setplaceOfbirthIsRequiredlError] =
    useState(false);
  const [nationality, setNationality] = useState("");
  const [nationalitylIsRequiredError, setnationalityIsRequiredlError] =
    useState(false);
  const [dateOfbirth, setDateOfbirth] = useState("");
  const [dateOfbirthlIsRequiredError, setdateOfbirthIsRequiredlError] =
    useState(false);
  const [dobError, setdobError] = useState(false);
  const string = /^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/;
  const [recipientsErrors, setRecipientsErrors] = useState([{}]);
  const [educationErrors, setEducationsErrors] = useState([{}]);
  const [sociallinkError, setsociallinkError] = useState([{}]);
  const [skilllinkError, setskilllinkError] = useState([{}]);
  const [courseError, setCourseError] = useState([{}]);
  const [InternshipError, setInternshipError] = useState([{}]);
  const [extraCurricularActivitiesError, setextraCurricularActivitiesError] =
    useState([{}]);
  const [languagesError, setlanguagesError] = useState([{}]);
  const [referencesError, setreferencesError] = useState([{}]);
  const num = /^[0-9]$/;
  const mobile = /^[6-9]\d{9}$/;
  const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;

  // Data ko show ker n k liye

  const [resumes, setResumes] = useState({
    job_title: "",
    image: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    permAddress: "",
    employmentHistory: "",
    cpAddress: "",
    postalCode: "",
    drivingLicense: "",
    nationality: "",
    placeOfbirth: "",
    dateOfbirth: "",
    education: "",
    socialLink: "",
    skills: "",
    courses: "",
    internship: "",
    extraCurricularActivities: "",
    languages: "",
    references: "",
    hobbies: "",
  });

  useEffect(() => {
    getResume();
  }, [id]);
  console.log("resumeInfo", resumes);

  const getResume = async () => {
    const response = await GetResumeById(id);
    console.log("resumelistdetail", response);
    if (response?.data?.code === 200) {
      console.log("resume iffo 2", response);
      setJob_Title(response?.data?.data?.job_title);
      setImage(response?.data?.data?.image);
      setFirstName(response?.data?.data?.firstName);
      setLastName(response?.data?.data?.lastName);
      setEmail(response?.data?.data?.email);
      setPhone(response?.data?.data?.phone.toString());
      setCountry(response?.data?.data?.country);
      setCity(response?.data?.data?.city);
      setPermAddress(response?.data?.data?.permAddress);
      setCpAddress(response?.data?.data?.cpAddress);
      setPostalCode(response?.data?.data?.postalCode);
      setDrivingLicense(response?.data?.data?.drivingLicense);
      setNationality(response?.data?.data?.nationality);
      setPlaceOfbirth(response?.data?.data?.placeOfbirth);
      setDateOfbirth(response?.data?.data?.dateOfbirth);
      setemploymentHistory(response?.data?.data?.employmentHistory);
      setEducation(response?.data?.data?.education);
      setSkills(response?.data?.data?.skills);
      setSocialLink(response?.data?.data?.socialLink);
      setInternship(response?.data?.data?.internship);
      setCourses(response?.data?.data?.courses);
      setExtraCurricularActivities(
        response?.data?.data?.extraCurricularActivities
      );
      setReferences(response?.data?.data?.references);
      setLanguages(response?.data?.data?.languages);
      setHobbies(response?.data?.data?.hobbies);
    }
  };

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

  // Validation on Each Field

  const checkRecipientsValidationOnSubmit = async () => {
    var valid = true;
    let errorMsg = employmentHistory.map((data, key) => {
      console.log(data);
      let error = {};

      if (data.jobTitle === "") {
        error.jobTitle = "Job title is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.employer === "") {
        error.employer = "Employer is required";
        valid = false;
      } else {
        error.name = "";
      }
      // if (data.startDate === "") {
      //   error.startDate = "Start Date is required";
      //   valid = false;
      // } else {
      //   error.name = "";
      // }
      // if (data.endDate === "") {
      //   error.endDate = "End Date is required";
      //   valid = false;
      // } else {
      //   error.name = "";
      // }

      if (data.startDate !== "" && data.endDate === "") {
        error.endDate = "Start Date is required";
        valid = false;
      } else {
        error.endDate = "";
      }

      if (data.startDate === "" && data.endDate !== "") {
        error.startDate = "End Date is required";
        valid = false;
      } else {
        error.startDate = "";
      }


      if (data.startDate && data.endDate) {
        var mStart = moment(data.startDate);
        var mEnd = moment(data.endDate);
        // mStart.isBefore(mEnd)
        if (mStart.isBefore(mEnd)) {
          error.startDate = "Start Date Date should be greater than End Date Date";
          valid = false;
        } else {
          error.endDate = "";
        }
      }

      if (data.isPresent === "") {
        error.isPresent = "Is present is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.city === "") {
        error.city = "City is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.description === "") {
        error.description = "Description is required";
        valid = false;
      } else {
        error.name = "";
      }
      return error;
    });
    setRecipientsErrors(errorMsg);
    return valid;
  };

  const checkEducationValidationOnSubmit = async () => {
    var valid = true;
    let errorMsg = education.map((data, key) => {
      console.log(data);
      let error = {};

      if (data.schoolName === "") {
        error.schoolName = "School name is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.degreeName === "") {
        error.degreeName = "Degree is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.startDate === "") {
        error.startDate = "Start Date is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.enddate === "") {
        error.enddate = "End Date is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.isPresent === "") {
        error.isPresent = "Is present is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.description === "") {
        error.description = "Description is required";
        valid = false;
      } else {
        error.name = "";
      }
      return error;
    });
    setEducationsErrors(errorMsg);
    return valid;
  };

  const checksociallinkValidationOnSubmit = async () => {
    var valid = true;
    let errorMsg = socialLink.map((data, key) => {
      console.log(data);
      let error = {};

      if (data.label === "") {
        error.label = "Label is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.link === "") {
        error.link = "Link is required";
        valid = false;
      } else {
        error.name = "";
      }
      return error;
    });
    setsociallinkError(errorMsg);
    return valid;
  };

  const checkcourseValidationOnSubmit = async () => {
    var valid = true;
    let errorMsg = courses.map((data, key) => {
      console.log(data);
      let error = {};

      if (data.course === "") {
        error.course = "Course name is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.institution === "") {
        error.institution = "Institution is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.startDate === "") {
        error.startDate = "Start Date is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.endDate === "") {
        error.endDate = "End Date is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.isPresent === "") {
        error.isPresent = "Is present is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.description === "") {
        error.description = "Description is required";
        valid = false;
      } else {
        error.name = "";
      }
      return error;
    });
    setCourseError(errorMsg);
    return valid;
  };

  const checkskillValidationOnSubmit = async () => {
    var valid = true;
    let errorMsg = skills.map((data, key) => {
      console.log(data);
      let error = {};

      if (data.skill === "") {
        error.skill = "skill is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.level === "") {
        error.level = "level is required";
        valid = false;
      }  else if (!num.test(data.level)) {
        error.level = "Level should be in number";
        valid = false;
      } else {
        error.name = "";
      }
      
      return error;
    });
    setskilllinkError(errorMsg);
    return valid;
  };

  const checkInternshipValidationOnSubmit = async () => {
    var valid = true;
    let errorMsg = employmentHistory.map((data, key) => {
      console.log(data);
      let error = {};

      if (data.jobTitle === "") {
        error.jobTitle = "Job title is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.employer === "") {
        error.employer = "Employer is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.startDate === "") {
        error.startDate = "Start Date is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.endDate === "") {
        error.endDate = "End Date is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.isPresent === "") {
        error.isPresent = "Is present is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.city === "") {
        error.city = "City is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.description === "") {
        error.description = "Description is required";
        valid = false;
      } else {
        error.name = "";
      }
      return error;
    });
    setInternshipError(errorMsg);
    return valid;
  };

  const checkECAValidationOnSubmit = async () => {
    var valid = true;
    let errorMsg = extraCurricularActivities.map((data, key) => {
      console.log(data);
      let error = {};

      if (data.functionTitle === "") {
        error.functionTitle = "functionTitle is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.employer === "") {
        error.employer = "Employer is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.startDate === "") {
        error.startDate = "Start Date is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.endDate === "") {
        error.endDate = "End Date is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.isPresent === "") {
        error.isPresent = "Is present is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.city === "") {
        error.city = "City is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.description === "") {
        error.description = "Description is required";
        valid = false;
      } else {
        error.name = "";
      }
      return error;
    });
    setextraCurricularActivitiesError(errorMsg);
    return valid;
  };

  const checkLanguagesValidationOnSubmit = async () => {
    var valid = true;
    let errorMsg = languages.map((data, key) => {
      console.log(data);
      let error = {};

      if (data.language === "") {
        error.language = "Language is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.level === "") {
        error.level = "Level is required";
        valid = false;
      } else if (!num.test(data.level)) {
        error.level = "Level should be in number";
        valid = false;
      } else {
        error.name = "";
      }
      return error;
    });
    setlanguagesError(errorMsg);
    return valid;
  };

  const checkrrefrencesValidationOnSubmit = async () => {
    var valid = true;
    let errorMsg = references.map((data, key) => {
      console.log(data);
      let error = {};

      if (data.refrentFullname === "") {
        error.refrentFullname = "Refrent full name is required";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.company === "") {
        error.company = "Company is required";
        valid = false;
      } else {
        error.name = "";
      }

      if (data.phone === "") {
        error.phone = "Phone Number is required";
        valid = false;
      }else if (!mobile.test(data.phone) ) {
        error.phone = "Please Enter Valid Phone Number";
        valid = false;
      } else {
        error.name = "";
      }
      if (data.email === "") {
        error.email = "Email is required";
        valid = false;
      } else if (!emailRegex.test(data.email) ) {
        error.email = "Please enter valid email";
        valid = false;
      } else {
        error.name = "";
      }

      return error;
    });
    setreferencesError(errorMsg);
    return valid;
  };

  // Handle buttons
  const handleJob_Title = (value) => {
    setJob_Title(value);
    if (value === "") {
      setjob_titleIsRequiredlError(true);
    } else {
      setjob_titleIsRequiredlError(false);
    }
  };
  const handleImage = async (e) => {
    console.log("handle profile photo", e);
    e.preventDefault();
    
    let reader = new FileReader();
    let file = e.target.files[0];
console.log(file, "imagesu")
    reader.onloadend = () => {
      setImage(file?.image);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };



  const handleLastName = (value) => {
    setLastName(value);
    if (value === "") {
      setlastNameIsRequiredlError(true);
    } else {
      setlastNameIsRequiredlError(false);
    }
  };
  const handleemail = (value) => {
    setEmail(value);
    const regex = /^[A-Za-z0-2._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
    if (value === "") {
      setemailIsRequiredlError(true);
      setEmailError(false);
    } else if (regex.test(value) === false) {
      setemailIsRequiredlError(false);
      setEmailError(true);
    } else {
      setEmailError(false);
      setemailIsRequiredlError(false);
    }
  };
  const handleName = (value) => {
    setFirstName(value);
    if (value === "") {
      setfirstNameIsRequiredlError(true);
    } else {
      setfirstNameIsRequiredlError(false);
    }
  };
  const handleMobileChange = (value) => {
    setPhone(value);
    const regex = /^[6-9]\d{9}$/;
    if (value === "") {
      setPhoneError(false);
      setPhoneIsRequiredlError(true);
    } else if (regex.test(value) === false) {
      setPhoneError(true);
      setPhoneIsRequiredlError(false);
    } else {
      setPhoneError(false);
      setPhoneIsRequiredlError(false);
    }
  };
  const handleCountry = (value) => {
    setCountry(value);
    if (value === "") {
      setcountryIsRequiredlError(true);
    } else {
      setcountryIsRequiredlError(false);
    }
  };
  const handleCity = (value) => {
    setCity(value);
    if (value === "") {
      setcityIsRequiredlError(true);
    } else {
      setcityIsRequiredlError(false);
    }
  };
  const handlePermAddress = (value) => {
    setPermAddress(value);
    if (value === "") {
      setpermAddressIsRequiredlError(true);
    } else {
      setpermAddressIsRequiredlError(false);
    }
  };
  const handleCpAddress = (value) => {
    setCpAddress(value);
    if (value === "") {
      setcpAddressIsRequiredlError(true);
    } else {
      setcpAddressIsRequiredlError(false);
    }
  };
  const handlPostalCode = (value) => {
    setPostalCode(value);
    if (value === "") {
      setpostalCodeIsRequiredlError(true);
    } else {
      setpostalCodeIsRequiredlError(false);
    }
  };
  const handleDrivingLicense = (value) => {
    setDrivingLicense(value);
    if (value === "") {
      setdrivingLicenseIsRequiredlError(true);
    } else {
      setdrivingLicenseIsRequiredlError(false);
    }
  };
  const handlePlaceOfbirth = (value) => {
    setPlaceOfbirth(value);
    if (value === "") {
      setplaceOfbirthIsRequiredlError(true);
    } else {
      setplaceOfbirthIsRequiredlError(false);
    }
  };
  const handleNationality = (value) => {
    setNationality(value);
    if (value === "") {
      setnationalityIsRequiredlError(true);
    } else {
      setnationalityIsRequiredlError(false);
    }
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
    if (value === "") {
      setdateOfbirthIsRequiredlError(true);
      setdobError(false);
    } else if (age >= 18) {
      setdobError(false);
      setdateOfbirthIsRequiredlError(false);
    } else {
      setdobError(true);
      setdateOfbirthIsRequiredlError(false);
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

    // console.log("filtered", hobbies);
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

  const handlesocialLinkFields = async () => {
    setSocialLink([...socialLink, { label: "", link: "" }]);
  };

  const handleSkillsFields = async () => {
    setSkills([...skills, { skill: "", level: "" }]);
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

  const handlelanguagesFields = async () => {
    setLanguages([...languages, { language: "", level: "" }]);
  };

  const handlereferencesFields = async () => {
    setReferences([
      ...references,
      { refrentFullname: "", company: "", phone: "", email: "" },
    ]);
  };

  // Make Dublicate row remove

  const removeEducationeRow = async (i) => {
    if (education.length > 1) {
      education.splice(i, 1);
      setEducation([...education]);
    }
  };

  const removereferencesRow = async (i) => {
    if (references.length > 1) {
      references.splice(i, 1);
      setRreferences([...references]);
    }
  };
  const removelanguagesRow = async (i) => {
    if (languages.length > 1) {
      languages.splice(i, 1);
      setLanguages([...languages]);
    }
  };

  const removeextraCurricularActivitiesRow = async (i) => {
    if (extraCurricularActivities.length > 1) {
      extraCurricularActivities.splice(i, 1);
      setExtraCurricularActivities([...extraCurricularActivities]);
    }
  };

  const removeinternshipRow = async (i) => {
    if (internship.length > 1) {
      internship.splice(i, 1);
      setInternship([...internship]);
    }
  };
  const removeskillsRow = async (i) => {
    if (skills.length > 1) {
      skills.splice(i, 1);
      setSkills([...skills]);
    }
  };
  const removecoursesRow = async (i) => {
    if (courses.length > 1) {
      courses.splice(i, 1);
      setCourses([...courses]);
    }
  };

  const removesocialLinkRow = async (i) => {
    if (socialLink.length > 1) {
      socialLink.splice(i, 1);
      setSocialLink([...socialLink]);
    }
  };
  const removeEmployeRow = async (i) => {
    if (employmentHistory.length > 1) {
      employmentHistory.splice(i, 1);
      setemploymentHistory([...employmentHistory]);
    }
  };

  // make duplicate fields
  const handleEmployChange = async (i, e) => {
    const value = [...employmentHistory];
    value[i][e.target.name] = e.target.value;
    setemploymentHistory(value);
    checkRecipientsValidationOnSubmit();
  };

  const handleEducation = async (i, e) => {
    const value = [...education];
    value[i][e.target.name] = e.target.value;
    setEducation(value);
    checkEducationValidationOnSubmit();
  };

  const handleSocialLink = async (i, e) => {
    const value = [...socialLink];
    value[i][e.target.name] = e.target.value;
    setSocialLink(value);
    checksociallinkValidationOnSubmit();
  };

  const handleSkills = async (i, e) => {
    const value = [...skills];
    value[i][e.target.name] = e.target.value;
    setSkills(value);
    checkskillValidationOnSubmit();
  };

  const handleCourses = async (i, e) => {
    const value = [...courses];
    value[i][e.target.name] = e.target.value;
    setCourses(value);
    checkcourseValidationOnSubmit();
  };

  const handleInternship = async (i, e) => {
    const value = [...internship];
    value[i][e.target.name] = e.target.value;
    setInternship(value);
    checkInternshipValidationOnSubmit();
  };

  const handleExtraCurricularActivities = async (i, e) => {
    const value = [...extraCurricularActivities];
    value[i][e.target.name] = e.target.value;
    setExtraCurricularActivities(value);
    checkECAValidationOnSubmit();
  };

  const handleLanguages = async (i, e) => {
    const value = [...languages];
    value[i][e.target.name] = e.target.value;
    setLanguages(value);
    checkLanguagesValidationOnSubmit();
  };

  const handleReferences = async (i, e) => {
    const value = [...references];
    value[i][e.target.name] = e.target.value;
    setReferences(value);
    checkrrefrencesValidationOnSubmit();
  };

  const resume = async (e) => {
    e.preventDefault();
    
    if (job_title === "" || !job_title) {
      setjob_titleIsRequiredlError(true);
    }
    if (image === "" || !image) {
      setimageIsRequiredlError(true);
    }
    if (firstName === "" || !firstName) {
      setfirstNameIsRequiredlError(true);
    }
    if (lastName === "" || !lastName) {
      setlastNameIsRequiredlError(true);
    }
    if (email === "" || !email) {
      setemailIsRequiredlError(true);
    }
    if (phone === "" || !phone) {
      setPhoneIsRequiredlError(true);
    }
    if (country === "" || !country) {
      setcountryIsRequiredlError(true);
    }
    if (city === "" || !city) {
      setcityIsRequiredlError(true);
    }
    if (permAddress === "" || !permAddress) {
      setpermAddressIsRequiredlError(true);
    }
    if (cpAddress === "" || !cpAddress) {
      setcpAddressIsRequiredlError(true);
    }
    if (postalCode === "" || !postalCode) {
      setpostalCodeIsRequiredlError(true);
    }
    if (drivingLicense === "" || !drivingLicense) {
      setdrivingLicenseIsRequiredlError(true);
    }
    if (nationality === "" || !nationality) {
      setnationalityIsRequiredlError(true);
    }
    if (placeOfbirth === "" || !placeOfbirth) {
      setplaceOfbirthIsRequiredlError(true);
    }
    if (dateOfbirth === "" || !dateOfbirth) {
      setdateOfbirthIsRequiredlError(true);
    }
  

    var isDocument = checkRecipientsValidationOnSubmit();
    var isDocument = checkEducationValidationOnSubmit();
    var isDocument = checksociallinkValidationOnSubmit();
    var isDocument = checkskillValidationOnSubmit();
    var isDocument = checkcourseValidationOnSubmit();
    var isDocument = checkInternshipValidationOnSubmit();
    var isDocument = checkECAValidationOnSubmit();
    var isDocument = checkLanguagesValidationOnSubmit();
    var isDocument = checkrrefrencesValidationOnSubmit();
    console.log(recipientsErrors);
    if (job_title !== "" && firstName!== "" && lastName !== "" && email !== "" && phone !== "" &&country !== ""&&city !== ""
    &&permAddress !== ""&&cpAddress !== ""&&postalCode !== ""&&drivingLicense !== ""&&nationality !== ""&&placeOfbirth !== ""&&dateOfbirth !== ""
    &&employmentHistory !== ""&&education !== ""&&socialLink !== ""&&skills !== ""&&courses !== ""&&internship !== ""&&extraCurricularActivities !== ""
    &&languages !== ""&&references !== ""&&hobbies !== "") {
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
        employmentHistory: employmentHistory,
        cpAddress: cpAddress,
        postalCode: postalCode,
        drivingLicense: drivingLicense,
        nationality: nationality,
        placeOfbirth: placeOfbirth,
        dateOfbirth: dateOfbirth,
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
      // if (isDocument) {
      const response = await updateResume(id, dat);
      console.log(response, "respoonse");
      if (response?.data.code !== 200) {
        setError(response?.data?.message);
        setIsError(true);
        setTimeout(() => {
          setError("");
          setIsError(false);
        }, 5000);
      } else {
        setIsError(false);
        localStorage.setItem(
          "token",
          response?.data?.data?.tokens.refresh.token
        );
        localStorage.setItem("resObje1", JSON.stringify(response?.data?.data));
        toast.success(response?.data?.message);
        history.push("/admin/resumelist");
      }
    } 
  };

  return (
    <>
      <Container className="text-info" fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Manage Resume</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={resume}>
                <Row>
                  <Col className="pl-1" md="6">
                      <Form.Group>
                        <h6>Profile Image</h6>

                        <label htmlFor="uploadPhoto" className="profileImg">
                          <img
                            src={
                              imagePreviewUrl == undefined
                                ? Profile
                                : imagePreviewUrl
                            }
                            style={{
                              width: 88,
                              height: 88,
                              borderRadius: 44,
                              overflow: "hidden",
                            }}
                          />
                          {/* <div className="icon">
                            <div className="camIcon">
                              <label htmlFor="uploadPhoto">
                                <FaPen />
                              </label>
                            </div>
                          </div> */}
                        </label>
                        <Form.Control
                          // className="form-control profile-select d-none"
                          type="file"
                          id="uploadPhoto"
                          htmlFor="exampleInputtext"
                          aria-describedby="textHelp"
                          name="image"
                          onChange={(e) => handleImage(e)}
                          accept="image/*"
                        ></Form.Control>
                        {imagelIsRequiredError && (
                          <div className="invalid-feedback mb-2">
                            Image is required
                          </div>
                        )}
                        {/* {imageError && (
                          <div className="invalid-feedback mb-2">
                          File does not support. You must use .png or .jpg
                          </div>
                        )}
                        {imageSizeError && (
                          <div className="invalid-feedback mb-2">
                          "Please upload a file smaller than 1 MB"
                          </div>
                        )} */}
                      </Form.Group>
                    </Col>
                    </Row>


                  <Row>
                    <Col className="pl-1" md="6">
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
                        {job_titlelIsRequiredError && (
                          <div className="invalid-feedback">
                            Job Title is required
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <h6>First Name</h6>

                        <Form.Control
                          placeholder="Enter your first name"
                          type="text"
                          value={firstName}
                          onChange={(e) => handleName(e.target.value)}
                        ></Form.Control>
                        {firstNamelIsRequiredError && (
                          <div className="invalid-feedback">
                            First Name is required
                          </div>
                        )}
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
                        {lastNamelIsRequiredError && (
                          <div className="invalid-feedback">
                            Last Name is required
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <h6>Email</h6>

                        <Form.Control
                          id="exampleInputtext"
                          aria-describedby="textHelp"
                          placeholder="email"
                          type="email"
                          value={email}
                          onChange={(e) => handleemail(e.target.value)}
                        ></Form.Control>
                        {emaillIsRequiredError && (
                          <div className="invalid-feedback">
                            Email is required
                          </div>
                        )}
                        {emailError && (
                          <div className="invalid-feedback">
                            Please enter valid email
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
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
                          type="text"
                          maxLength="10"
                          value={phone}
                          onChange={(e) => handleMobileChange(e.target.value)}
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
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <h6>Country</h6>

                        <Form.Control
                          placeholder="Country"
                          type="text"
                          value={country}
                          onChange={(e) => handleCountry(e.target.value)}
                        ></Form.Control>
                        {countrylIsRequiredError && (
                          <div className="invalid-feedback">
                            Country is required
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <h6>City</h6>

                        <Form.Control
                          placeholder="city"
                          type="text"
                          value={city}
                          onChange={(e) => handleCity(e.target.value)}
                        ></Form.Control>
                        {citylIsRequiredError && (
                          <div className="invalid-feedback">
                            City is required
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="12">
                      <Form.Group>
                        <h6>Permanent Address</h6>

                        <Form.Control
                          placeholder="Home Address"
                          type="text"
                          value={permAddress}
                          onChange={(e) => handlePermAddress(e.target.value)}
                        ></Form.Control>
                        {permAddresslIsRequiredError && (
                          <div className="invalid-feedback">
                            Permanent Address is required
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="12">
                      <Form.Group>
                        <h6>Correspondence Address</h6>

                        <Form.Control
                          placeholder="Home Address"
                          type="text"
                          value={cpAddress}
                          onChange={(e) => handleCpAddress(e.target.value)}
                        ></Form.Control>
                        {cpAddresslIsRequiredError && (
                          <div className="invalid-feedback">
                            Correspondence Address is required
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <h6>Postal Code</h6>

                        <Form.Control
                          placeholder="Postal Code"
                          type="number"
                          value={postalCode}
                          onChange={(e) => handlPostalCode(e.target.value)}
                        ></Form.Control>
                        {postalCodelIsRequiredError && (
                          <div className="invalid-feedback">
                            Postal Code Address is required
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <h6>Driving License</h6>

                        <Form.Control
                          placeholder="Driving License"
                          type="text"
                          value={drivingLicense}
                          onChange={(e) => handleDrivingLicense(e.target.value)}
                        ></Form.Control>
                        {drivingLicenselIsRequiredError && (
                          <div className="invalid-feedback">
                            Driving License Address is required
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <h6>Nationality</h6>

                        <Form.Control
                          placeholder="nationality"
                          type="text"
                          value={nationality}
                          onChange={(e) => handleNationality(e.target.value)}
                        ></Form.Control>
                        {nationalitylIsRequiredError && (
                          <div className="invalid-feedback">
                            Nationality Address is required
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <h6>Place Of birth</h6>

                        <Form.Control
                          placeholder="place Of birth"
                          type="text"
                          value={placeOfbirth}
                          onChange={(e) => handlePlaceOfbirth(e.target.value)}
                        ></Form.Control>
                        {placeOfbirthlIsRequiredError && (
                          <div className="invalid-feedback">
                            Place Of birth is required
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
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
                          value={moment(dateOfbirth).format("yyyy-MM-DD")}
                          onChange={(e) => handleDateOfbirth(e.target.value)}
                        ></Form.Control>
                        {dobError && (
                          <div className="invalid-feedback">
                            Please valid date of birth
                          </div>
                        )}
                        {dateOfbirthlIsRequiredError && (
                          <div className="invalid-feedback">
                            Date Of birth is required
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <div className="app">
                        <h6>Select your Hobbies</h6>
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
                  {/* Employment History */}
                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5>Employment History</h5>
                            <div className="editDetail_btn ">
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
                            <Row>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Job Title</h6>

                                  <Form.Control
                                    placeholder="jobTitle"
                                    type="text"
                                    name="jobTitle"
                                    value={identificationField.jobTitle}
                                    onChange={(e) => handleEmployChange(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {recipientsErrors.length - 1 >= i &&
                                      recipientsErrors[i].jobTitle}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Employer</h6>
                                  <Form.Control
                                    placeholder="employer"
                                    type="text"
                                    name="employer"
                                    value={identificationField.employer}
                                    onChange={(e) => handleEmployChange(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {recipientsErrors.length - 1 >= i &&
                                      recipientsErrors[i].employer}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Start Date</h6>

                                  <Form.Control
                                    placeholder="start Date"
                                    type="date"
                                    name="startDate"
                                    value={moment(
                                      identificationField.startDate
                                    ).format("yyyy-MM-DD")}
                                    onChange={(e) => handleEmployChange(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {recipientsErrors.length - 1 >= i &&
                                      recipientsErrors[i].startDate}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>End Date</h6>

                                  <Form.Control
                                    placeholder="End Date"
                                    type="date"
                                    name="endDate"
                                    value={moment(
                                      identificationField.endDate
                                    ).format("yyyy-MM-DD")}
                                    onChange={(e) => handleEmployChange(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {recipientsErrors.length - 1 >= i &&
                                      recipientsErrors[i].endDate}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Is Present</h6>
                                  <Form.Control
                                    placeholder="Is Present"
                                    type="text"
                                    name="isPresent"
                                    value={identificationField.isPresent}
                                    onChange={(e) => handleEmployChange(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {recipientsErrors.length - 1 >= i &&
                                      recipientsErrors[i].isPresent}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>City</h6>

                                  <Form.Control
                                    placeholder="City"
                                    type="text"
                                    name="city"
                                    value={identificationField.city}
                                    onChange={(e) => handleEmployChange(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {recipientsErrors.length - 1 >= i &&
                                      recipientsErrors[i].city}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="12">
                                <Form.Group>
                                  <h6>Description</h6>

                                  <Form.Control
                                    placeholder="Description"
                                    type="text"
                                    name="description"
                                    value={identificationField.description}
                                    onChange={(e) => handleEmployChange(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {recipientsErrors.length - 1 >= i &&
                                      recipientsErrors[i].description}
                                  </div>
                                </Form.Group>
                              </Col>
                            </Row>
                            {employmentHistory.length > 1 && (
                              <div className="text-right ">
                                <span
                                  className="btn closeBtn"
                                  onClick={(e) => removeEmployeRow(i)}
                                >
                                  <FaTimes />
                                </span>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                  {/* Education History */}
                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5>Education History</h5>
                            <div className="editDetail_btn ">
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
                            <Row>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>School Name</h6>
                                  <Form.Control
                                    placeholder="School Name"
                                    type="text"
                                    name="schoolName"
                                    value={educationField.schoolName}
                                    onChange={(e) => handleEducation(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {educationErrors.length - 1 >= i &&
                                      educationErrors[i].schoolName}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Degree Name</h6>
                                  <Form.Control
                                    placeholder="Degree Name"
                                    type="text"
                                    name="degreeName"
                                    value={educationField.degreeName}
                                    onChange={(e) => handleEducation(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {educationErrors.length - 1 >= i &&
                                      educationErrors[i].degreeName}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Start Date</h6>
                                  <Form.Control
                                    placeholder="start Date"
                                    type="date"
                                    name="startDate"
                                    value={moment(
                                      educationField.startDate
                                    ).format("yyyy-MM-DD")}
                                    onChange={(e) => handleEducation(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {educationErrors.length - 1 >= i &&
                                      educationErrors[i].startDate}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>End Date</h6>
                                  <Form.Control
                                    placeholder="End Date"
                                    type="date"
                                    name="enddate"
                                    value={moment(
                                      educationField.enddate
                                    ).format("yyyy-MM-DD")}
                                    onChange={(e) => handleEducation(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {educationErrors.length - 1 >= i &&
                                      educationErrors[i].enddate}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Is Present</h6>
                                  <Form.Control
                                    placeholder="Is Present"
                                    type="text"
                                    name="isPresent"
                                    value={educationField.isPresent}
                                    onChange={(e) => handleEducation(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {educationErrors.length - 1 >= i &&
                                      educationErrors[i].isPresent}
                                  </div>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pl-1" md="12">
                                <Form.Group>
                                  <h6>Description</h6>
                                  <Form.Control
                                    placeholder="Description"
                                    type="text"
                                    name="description"
                                    value={educationField.description}
                                    onChange={(e) => handleEducation(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {educationErrors.length - 1 >= i &&
                                      educationErrors[i].description}
                                  </div>
                                </Form.Group>
                              </Col>
                            </Row>
                            {education.length > 1 && (
                              <div className="text-right ">
                                <span
                                  className="btn btn closeBtn"
                                  onClick={(e) => removeEducationeRow(i)}
                                >
                                  <FaTimes />
                                </span>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                  {/* Social Links */}
                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle ml-6 mt-0 mt-md-3 mb-md-2">
                            <h5> Social Link </h5>
                            <div className="editDetail_btn">
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
                            <Row>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Label</h6>
                                  <Form.Control
                                    placeholder="Gmail"
                                    type="text"
                                    name="label"
                                    value={socialLinkField.label}
                                    onChange={(e) => handleSocialLink(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {sociallinkError.length - 1 >= i &&
                                      sociallinkError[i].label}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>link</h6>
                                  <Form.Control
                                    placeholder="LinkedIn profile"
                                    type="text"
                                    name="link"
                                    value={socialLinkField.link}
                                    onChange={(e) => handleSocialLink(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {sociallinkError.length - 1 >= i &&
                                      sociallinkError[i].link}
                                  </div>
                                </Form.Group>
                              </Col>
                            </Row>
                            {socialLink.length > 1 && (
                              <div className="text-right  mr-6">
                                <span
                                  className="btn closeBtn "
                                  onClick={(e) => removesocialLinkRow(i)}
                                >
                                  <FaTimes />
                                </span>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                  {/* Skills */}
                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5> Skills </h5>
                            <div className="editDetail_btn">
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
                            <Row>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Skill Name</h6>
                                  <Form.Control
                                    placeholder="Skill Name"
                                    type="text"
                                    name="skill"
                                    value={skillsField.skill}
                                    onChange={(e) => handleSkills(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {skilllinkError.length - 1 >= i &&
                                      skilllinkError[i].skill}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Level</h6>
                                  <Form.Control
                                    placeholder="level in numbers"
                                    type="text"
                                    name="level"
                                    maxLength="1"
                                    value={skillsField.level}
                                    onChange={(e) => handleSkills(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {skilllinkError.length - 1 >= i &&
                                      skilllinkError[i].level}
                                  </div>
                                </Form.Group>
                              </Col>
                            </Row>
                            {skills.length > 1 && (
                              <div className="text-right ">
                                <span
                                  className="btn closeBtn"
                                  onClick={(e) => removeskillsRow(i)}
                                >
                                  <FaTimes />
                                </span>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                  {/* Courses */}
                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5> Courses </h5>
                            <div className="editDetail_btn">
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
                            <Row>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Course Name</h6>
                                  <Form.Control
                                    placeholder="Course Name"
                                    type="text"
                                    name="course"
                                    value={coursesField.course}
                                    onChange={(e) => handleCourses(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {courseError.length - 1 >= i &&
                                      courseError[i].course}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Institution</h6>
                                  <Form.Control
                                    placeholder="Institution"
                                    type="text"
                                    name="institution"
                                    value={coursesField.institution}
                                    onChange={(e) => handleCourses(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {courseError.length - 1 >= i &&
                                      courseError[i].institution}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Start Date</h6>
                                  <Form.Control
                                    placeholder="start Date"
                                    type="date"
                                    name="startDate"
                                    value={moment(
                                      coursesField.startDate
                                    ).format("yyyy-MM-DD")}
                                    onChange={(e) => handleCourses(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {courseError.length - 1 >= i &&
                                      courseError[i].startDate}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>End Date</h6>
                                  <Form.Control
                                    placeholder="End Date"
                                    type="date"
                                    name="endDate"
                                    value={moment(coursesField.endDate).format(
                                      "yyyy-MM-DD"
                                    )}
                                    onChange={(e) => handleCourses(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {courseError.length - 1 >= i &&
                                      courseError[i].endDate}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Is Present</h6>
                                  <Form.Control
                                    placeholder="Is Present"
                                    type="text"
                                    name="isPresent"
                                    value={coursesField.isPresent}
                                    onChange={(e) => handleCourses(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {courseError.length - 1 >= i &&
                                      courseError[i].isPresent}
                                  </div>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pl-1" md="12">
                                <Form.Group>
                                  <h6>Description</h6>
                                  <Form.Control
                                    placeholder="Description"
                                    type="text"
                                    name="description"
                                    value={coursesField.description}
                                    onChange={(e) => handleCourses(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {courseError.length - 1 >= i &&
                                      courseError[i].description}
                                  </div>
                                </Form.Group>
                              </Col>
                            </Row>
                            {courses.length > 1 && (
                              <div className="text-right ">
                                <span
                                  className="btn closeBtn"
                                  onClick={(e) => removecoursesRow(i)}
                                >
                                  <FaTimes />
                                </span>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                  {/* Internship */}
                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5> Internship </h5>
                            <div className="editDetail_btn">
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
                            <Row>
                              <Col cclassName="pl-1" md="6">
                                <Form.Group>
                                  <h6>Job Title</h6>
                                  <Form.Control
                                    placeholder="jobTitle"
                                    type="text"
                                    name="jobTitle"
                                    value={internshipField.jobTitle}
                                    onChange={(e) => handleInternship(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {InternshipError.length - 1 >= i &&
                                      InternshipError[i].jobTitle}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Employer</h6>
                                  <Form.Control
                                    placeholder="Employer"
                                    type="text"
                                    name="employer"
                                    value={internshipField.employer}
                                    onChange={(e) => handleInternship(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {InternshipError.length - 1 >= i &&
                                      InternshipError[i].employer}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Start Date</h6>
                                  <Form.Control
                                    placeholder="start Date"
                                    type="date"
                                    name="startDate"
                                    value={moment(
                                      internshipField.startDate
                                    ).format("yyyy-MM-DD")}
                                    onChange={(e) => handleInternship(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {InternshipError.length - 1 >= i &&
                                      InternshipError[i].startDate}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>End Date</h6>
                                  <Form.Control
                                    placeholder="End Date"
                                    type="date"
                                    name="endDate"
                                    value={moment(
                                      internshipField.endDate
                                    ).format("yyyy-MM-DD")}
                                    onChange={(e) => handleInternship(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {InternshipError.length - 1 >= i &&
                                      InternshipError[i].endDate}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Is Present</h6>
                                  <Form.Control
                                    placeholder="Is Present"
                                    type="text"
                                    name="isPresent"
                                    value={internshipField.isPresent}
                                    onChange={(e) => handleInternship(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {InternshipError.length - 1 >= i &&
                                      InternshipError[i].isPresent}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>city</h6>
                                  <Form.Control
                                    placeholder="City Name"
                                    type="text"
                                    name="city"
                                    value={internshipField.city}
                                    onChange={(e) => handleInternship(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {InternshipError.length - 1 >= i &&
                                      InternshipError[i].city}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="12">
                                <Form.Group>
                                  <h6>Description</h6>
                                  <Form.Control
                                    placeholder="Description"
                                    type="text"
                                    name="description"
                                    value={internshipField.description}
                                    onChange={(e) => handleInternship(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {InternshipError.length - 1 >= i &&
                                      InternshipError[i].description}
                                  </div>
                                </Form.Group>
                              </Col>
                            </Row>
                            {internship.length > 1 && (
                              <div className="text-right ">
                                <span
                                  className="btn closeBtn"
                                  onClick={(e) => removeinternshipRow(i)}
                                >
                                  <FaTimes />
                                </span>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                  {/*  Extra Curricular Activities */}
                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5> Extra Curricular Activities </h5>
                            <div className="editDetail_btn">
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
                              <Row>
                                <Col className="pl-1" md="6">
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
                                    <div className="invalid-feedback mt-1">
                                      {extraCurricularActivitiesError.length -
                                        1 >=
                                        i &&
                                        extraCurricularActivitiesError[i]
                                          .functionTitle}
                                    </div>
                                  </Form.Group>
                                </Col>
                                <Col className="pl-1" md="6">
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
                                    <div className="invalid-feedback mt-1">
                                      {extraCurricularActivitiesError.length -
                                        1 >=
                                        i &&
                                        extraCurricularActivitiesError[i]
                                          .employer}
                                    </div>
                                  </Form.Group>
                                </Col>
                                <Col className="pl-1" md="6">
                                  <Form.Group>
                                    <h6>Start Date</h6>
                                    <Form.Control
                                      placeholder="start Date"
                                      type="date"
                                      name="startDate"
                                      value={moment(
                                        extraCurricularActivitiesField.startDate
                                      ).format("yyyy-MM-DD")}
                                      onChange={(e) =>
                                        handleExtraCurricularActivities(i, e)
                                      }
                                    ></Form.Control>
                                    <div className="invalid-feedback mt-1">
                                      {extraCurricularActivitiesError.length -
                                        1 >=
                                        i &&
                                        extraCurricularActivitiesError[i]
                                          .startDate}
                                    </div>
                                  </Form.Group>
                                </Col>
                                <Col className="pl-1" md="6">
                                  <Form.Group>
                                    <h6>End Date</h6>
                                    <Form.Control
                                      placeholder="End Date"
                                      type="date"
                                      name="endDate"
                                      value={moment(
                                        extraCurricularActivitiesField.endDate
                                      ).format("yyyy-MM-DD")}
                                      onChange={(e) =>
                                        handleExtraCurricularActivities(i, e)
                                      }
                                    ></Form.Control>
                                    <div className="invalid-feedback mt-1">
                                      {extraCurricularActivitiesError.length -
                                        1 >=
                                        i &&
                                        extraCurricularActivitiesError[i]
                                          .endDate}
                                    </div>
                                  </Form.Group>
                                </Col>
                                <Col className="pl-1" md="6">
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
                                    <div className="invalid-feedback mt-1">
                                      {extraCurricularActivitiesError.length -
                                        1 >=
                                        i &&
                                        extraCurricularActivitiesError[i]
                                          .isPresent}
                                    </div>
                                  </Form.Group>
                                </Col>
                                <Col className="pl-1" md="6">
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
                                    <div className="invalid-feedback mt-1">
                                      {extraCurricularActivitiesError.length -
                                        1 >=
                                        i &&
                                        extraCurricularActivitiesError[i].city}
                                    </div>
                                  </Form.Group>
                                </Col>
                                <Col className="pl-1" md="12">
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
                                    <div className="invalid-feedback mt-1">
                                      {extraCurricularActivitiesError.length -
                                        1 >=
                                        i &&
                                        extraCurricularActivitiesError[i]
                                          .description}
                                    </div>
                                  </Form.Group>
                                </Col>
                              </Row>
                              {extraCurricularActivities.length > 1 && (
                                <div className="text-right ">
                                  <span
                                    className="btn closeBtn"
                                    onClick={(e) =>
                                      removeextraCurricularActivitiesRow(i)
                                    }
                                  >
                                    <FaTimes />
                                  </span>
                                </div>
                              )}
                            </>
                          );
                        }
                      )}
                    </div>
                  </div>
                  {/*  Languages */}
                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5> Languages </h5>
                            <div className="editDetail_btn">
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
                            <Row>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Language Name</h6>
                                  <Form.Control
                                    placeholder="Skill Name"
                                    type="text"
                                    name="language"
                                    value={languagesField.language}
                                    onChange={(e) => handleLanguages(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {languagesError.length - 1 >= i &&
                                      languagesError[i].language}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Level</h6>
                                  <Form.Control
                                    placeholder="level in numbers"
                                    type="text"
                                    name="level"
                                    maxLength="1"
                                    value={languagesField.level}
                                    onChange={(e) => handleLanguages(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {languagesError.length - 1 >= i &&
                                      languagesError[i].level}
                                  </div>
                                </Form.Group>
                              </Col>
                            </Row>
                            {languages.length > 1 && (
                              <div className="text-right ">
                                <span
                                  className="btn closeBtn"
                                  onClick={(e) => removelanguagesRow(i)}
                                >
                                  <FaTimes />
                                </span>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                  {/* References */}
                  <div className="identityBox borderT">
                    <div className="identificationDocument">
                      <div className="row">
                        <div className="col-12">
                          <div className="identityTitle mt-0 mt-md-3 mb-md-2">
                            <h5> References </h5>
                            <div className="editDetail_btn">
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
                            <Row>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Refrent Fullname</h6>
                                  <Form.Control
                                    placeholder="Refrent Fullname"
                                    type="text"
                                    name="refrentFullname"
                                    value={referencesField.refrentFullname}
                                    onChange={(e) => handleReferences(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {referencesError.length - 1 >= i &&
                                      referencesError[i].refrentFullname}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Company</h6>
                                  <Form.Control
                                    placeholder="company"
                                    type="text"
                                    name="company"
                                    value={referencesField.company}
                                    onChange={(e) => handleReferences(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {referencesError.length - 1 >= i &&
                                      referencesError[i].company}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Phone Number</h6>
                                  <Form.Control
                                    placeholder="phone"
                                    type="text"
                                    maxLength="10"
                                    name="phone"
                                    value={referencesField.phone}
                                    onChange={(e) => handleReferences(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {referencesError.length - 1 >= i &&
                                      referencesError[i].phone}
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <h6>Email</h6>
                                  <Form.Control
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    value={referencesField.email}
                                    onChange={(e) => handleReferences(i, e)}
                                  ></Form.Control>
                                  <div className="invalid-feedback mt-1">
                                    {referencesError.length - 1 >= i &&
                                      referencesError[i].email}
                                  </div>
                                </Form.Group>
                              </Col>
                            </Row>
                            {references.length > 1 && (
                              <div className="text-right ">
                                <span
                                  className="btn closeBtn"
                                  onClick={(e) => removereferencesRow(i)}
                                >
                                  <FaTimes />
                                </span>
                              </div>
                            )}
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
