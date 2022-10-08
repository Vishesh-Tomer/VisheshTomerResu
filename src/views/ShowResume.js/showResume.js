import React, { useEffect, useState } from "react";
import "./Styleresume.scss";
import { GetResumeById } from "Service/auth";
import { useHistory, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// react-bootstrap components
import { Row, Col } from "react-bootstrap";
import Title from "antd/lib/skeleton/Title";

function showResume() {
  const history = useHistory();
  const { id } = useParams();

  // Data ko show ker n k liye

  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    getResume();
  }, [id]);
  console.log("resumeInfo", resumes);

  const getResume = async () => {
    const response = await GetResumeById(id);
    console.log("resumelistdetail", response);
    if (response?.data?.code === 200) {
      console.log("resume iffo 2", response);
      setResumes(response?.data?.data);
      toast.success("User Information fetch successfully");
    }
  };

  // const resume = async (e) => {
  //   e.preventDefault();

  //   var isDocument = checkRecipientsValidationOnSubmit();
  //   var isDocument = checkEducationValidationOnSubmit();
  //   var isDocument = checksociallinkValidationOnSubmit();
  //   var isDocument = checkskillValidationOnSubmit();
  //   var isDocument = checkcourseValidationOnSubmit();
  //   var isDocument = checkInternshipValidationOnSubmit();
  //   var isDocument = checkECAValidationOnSubmit();
  //   var isDocument = checkLanguagesValidationOnSubmit();
  //   var isDocument = checkrrefrencesValidationOnSubmit();
  //   console.log(recipientsErrors);
  //   if (job_title !== "" && image !== "") {
  //     const dat = {
  //       job_title: job_title,
  //       image: image,
  //       firstName: firstName,
  //       lastName: lastName,
  //       email: email,
  //       phone: phone,
  //       country: country,
  //       city: city,
  //       permAddress: permAddress,
  //       employmentHistory: employmentHistory,
  //       cpAddress: cpAddress,
  //       postalCode: postalCode,
  //       drivingLicense: drivingLicense,
  //       nationality: nationality,
  //       placeOfbirth: placeOfbirth,
  //       dateOfbirth: dateOfbirth,
  //       education: education,
  //       socialLink: socialLink,
  //       skills: skills,
  //       courses: courses,
  //       internship: internship,
  //       extraCurricularActivities: extraCurricularActivities,
  //       languages: languages,
  //       references: references,
  //       hobbies: hobbies,
  //     };
  //     // if (isDocument) {
  //     const response = await adminResume(dat);
  //     console.log(response, "respoonse");
  //     if (response?.data.code !== 200) {
  //       setError(response?.data?.message);
  //       setIsError(true);
  //       setTimeout(() => {
  //         setError("");
  //         setIsError(false);
  //       }, 5000);
  //     } else {
  //       setIsError(false);
  //       localStorage.setItem(
  //         "token",
  //         response?.data?.data?.tokens.refresh.token
  //       );
  //       localStorage.setItem("resObje1", JSON.stringify(response?.data?.data));
  //       toast.success(response?.data?.message);
  //       history.push("/admin/resumelist");
  //     }
  //   } else {
  //     if (job_title === "" || !job_title) {
  //       setjob_titleIsRequiredlError(true);
  //     }
  //     if (image === "" || !image) {
  //       setimageIsRequiredlError(true);
  //     }
  //     if (firstName === "" || !firstName) {
  //       setfirstNameIsRequiredlError(true);
  //     }
  //     if (lastName === "" || !lastName) {
  //       setlastNameIsRequiredlError(true);
  //     }
  //     if (email === "" || !email) {
  //       setemailIsRequiredlError(true);
  //     }
  //     if (phone === "" || !phone) {
  //       setPhoneIsRequiredlError(true);
  //     }
  //     if (country === "" || !country) {
  //       setcountryIsRequiredlError(true);
  //     }
  //     if (city === "" || !city) {
  //       setcityIsRequiredlError(true);
  //     }
  //     if (permAddress === "" || !permAddress) {
  //       setpermAddressIsRequiredlError(true);
  //     }
  //     if (cpAddress === "" || !cpAddress) {
  //       setcpAddressIsRequiredlError(true);
  //     }
  //     if (postalCode === "" || !postalCode) {
  //       setpostalCodeIsRequiredlError(true);
  //     }
  //     if (drivingLicense === "" || !drivingLicense) {
  //       setdrivingLicenseIsRequiredlError(true);
  //     }
  //     if (nationality === "" || !nationality) {
  //       setnationalityIsRequiredlError(true);
  //     }
  //     if (placeOfbirth === "" || !placeOfbirth) {
  //       setplaceOfbirthIsRequiredlError(true);
  //     }
  //     if (dateOfbirth === "" || !dateOfbirth) {
  //       setdateOfbirthIsRequiredlError(true);
  //     }
  //   }
  // };

  return (
    <>
    <ToastContainer />
      <section id="save">
        <section className="sheet">
          <aside>
            <section className="contact">
              <h6>Contact</h6>
              <ul>
                <li>
                  <p>
                    <i className="nc-icon nc-circle-09" title="user"></i>{" "}
                    {resumes.firstName} {resumes.lastName}
                  </p>
                </li>
                <li>
                  <p>
                    <i className="fa fa-map-marker-alt" title="Location"></i>{" "}
                    {resumes?.city}
                  </p>
                </li>
                <li>
                  <p>
                    <i className="fa fa-phone" title="Cell phone"></i>{" "}
                    <a href="tel:4153234000">{resumes.phone}</a>
                  </p>
                </li>
                <li>
                  <p>
                    <i className="fa fa-envelope" title="Email"></i>{" "}
                    <a href="mailto:joe@joesmith.site">{resumes.email}</a>
                  </p>
                </li>
                <li>
                  <p>
                    <i className="fa fa-globe-americas" title="Website"></i>{" "}
                    <a href="https://joesmith.site">
                      {resumes?.socialLink?.slice(0, 5)[0]?.label}
                    </a>
                  </p>
                </li>
                <li>
                  <p>
                    <i className="fab fa-github" title="GitHub"></i>{" "}
                    <a href="https://github.com/Tombarr">
                      {resumes?.socialLink?.slice(0, 5)[0]?.link}
                    </a>
                  </p>
                </li>
              </ul>
            </section>
            <section className="skills">
              <h6>Skills</h6>
              <ul>
                <span>{resumes?.skills?.slice(0, 5)[0]?.skill}</span>
                <br></br>
                <span>{resumes?.skills?.slice(0, 5)[1]?.skill}</span>
                <br></br>
                <span>{resumes?.skills?.slice(0, 5)[2]?.skill}</span>
              </ul>
            </section>
            <section className="skills">
              <h6>Hobbies</h6>
              <ul>
                <span>{resumes?.hobbies?.slice(0, 5)[0]}</span>
                <br></br>
                <span>{resumes?.hobbies?.slice(0, 5)[1]}</span>
                <br></br>
                <span>{resumes?.hobbies?.slice(0, 5)[2]}</span>
                <br></br>
                <span>{resumes?.hobbies?.slice(0, 5)[3]}</span>
              </ul>
            </section>
            <section className="skills">
              <h6>Languages</h6>
              <ul>
                <span>{resumes?.languages?.slice(0, 5)[0]?.language}</span>
                <br></br>
                <span>{resumes?.languages?.slice(0, 5)[2]?.language}</span>
                <br></br>
                <span>{resumes?.languages?.slice(0, 5)[3]?.language}</span>
              </ul>
            </section>
            <section className="references">
              <h6>References</h6>
            
                {resumes?.references?.slice(0, 5)[0]?.refrentFullname}
                <br />
                {resumes?.references?.slice(0, 5)[0]?.company}
                <br />
                {resumes?.references?.slice(0, 5)[0]?.email}
                <br />
                {resumes?.references?.slice(0, 5)[0]?.phone}
                {resumes?.references?.slice(0, 5)[1]?.refrentFullname}
                <br />
                {resumes?.references?.slice(0, 5)[1]?.company}
                <br />
                {resumes?.references?.slice(0, 5)[1]?.email}
                <br />
                {resumes?.references?.slice(0, 5)[1]?.phone}
            </section>
          </aside>
          <section>
            <header className="name" aria-label="Joe Smith">
              <h6>{resumes.job_title}</h6>
              <hr />
            </header>
            <section>
              <section className="experience">
                <h6>Experience</h6>
                <ol>
                  <li>
                    <header>
                      <p className="sanserif">{resumes?.employmentHistory?.slice(0, 5)[0]?.jobTitle}</p>
                      <time>{resumes?.employmentHistory?.slice(0, 5)[0]?.startDate.slice(0, 7)}  {resumes?.employmentHistory?.slice(0, 5)[0]?.endDate.slice(0, 7)}</time>
                    </header>
                    <span>{resumes?.employmentHistory?.slice(0, 5)[0]?.employer}</span>
                    <ul>
                      <li>{resumes?.employmentHistory?.slice(0, 5)[0]?.city}</li>
                      <li>{resumes?.employmentHistory?.slice(0, 5)[0]?.description?.slice(0 ,10)}</li>
                    </ul>
                  </li>
                  <li>
                    <header>
                      <p className="sanserif">{resumes?.employmentHistory?.slice(0, 5)[1]?.jobTitle}</p>
                      <time>{resumes?.employmentHistory?.slice(0, 5)[1]?.startDate.slice(0, 7)}  {resumes?.employmentHistory?.slice(0, 5)[1]?.endDate.slice(0, 7)}</time>
                    </header>
                    <span>{resumes?.employmentHistory?.slice(0, 5)[1]?.employer}</span>
                    <ul>
                      <li>{resumes?.employmentHistory?.slice(0, 5)[1]?.city}</li>
                      <li>{resumes?.employmentHistory?.slice(0, 5)[1]?.description?.slice(0 ,10)}</li>
                    </ul>
                  </li>
                  <li>
                    <header>
                      <p className="sanserif">{resumes?.employmentHistory?.slice(0, 5)[2]?.jobTitle}</p>
                      <time>{resumes?.employmentHistory?.slice(0, 5)[2]?.startDate.slice(0, 7)}  {resumes?.employmentHistory?.slice(0, 5)[1]?.endDate.slice(0, 7)}</time>
                    </header>
                    <span>{resumes?.employmentHistory?.slice(0, 5)[2]?.employer}</span>
                    <ul>
                      <li>{resumes?.employmentHistory?.slice(0, 5)[2]?.city}</li>
                      <li>{resumes?.employmentHistory?.slice(0, 5)[2]?.description?.slice(0 ,10)}</li>
                    </ul>
                  </li>
                </ol>
              </section>
              <section className="experience">
                <h6>Internship</h6>
                <ol>
                  <li>
                    <header>
                      <p className="sanserif">{resumes?.internship?.slice(0, 5)[0]?.jobTitle}</p>
                      <time>{resumes?.internship?.slice(0, 5)[0]?.startDate.slice(0, 7)} {resumes?.employmentHistory?.slice(0, 5)[0]?.endDate.slice(0, 7)}</time>
                    </header>
                    <span>{resumes?.internship?.slice(0, 5)[0]?.employer}</span>
                    <ul>
                      <li>{resumes?.internship?.slice(0, 5)[0]?.city}</li>
                      <li>{resumes?.internship?.slice(0, 5)[0]?.description?.slice(0 ,10)}</li>
                    </ul>
                  </li>
                  <li>
                    <header>
                      <p className="sanserif">{resumes?.internship?.slice(0, 5)[1]?.jobTitle}</p>
                      <time>{resumes?.internship?.slice(0, 5)[1]?.startDate.slice(0, 7)} {resumes?.employmentHistory?.slice(0, 5)[1]?.endDate.slice(0, 7)}</time>
                    </header>
                    <span>{resumes?.internship?.slice(0, 5)[1]?.employer}</span>
                    <ul>
                      <li>{resumes?.internship?.slice(0, 5)[1]?.city}</li>
                      <li>{resumes?.internship?.slice(0, 5)[1]?.description?.slice(0 ,10)}</li>
                    </ul>
                  </li>
                  <li>
                    <header>
                      <p className="sanserif">{resumes?.internship?.slice(0, 5)[2]?.jobTitle}</p>
                      <time>{resumes?.internship?.slice(0, 5)[2]?.startDate.slice(0, 7)} {resumes?.employmentHistory?.slice(0, 5)[1]?.endDate.slice(0, 7)}</time>
                    </header>
                    <span>{resumes?.internship?.slice(0, 5)[2]?.employer}</span>
                    <ul>
                      <li>{resumes?.internship?.slice(0, 5)[2]?.city}</li>
                      <li>{resumes?.internship?.slice(0, 5)[2]?.description?.slice(0 ,10)}</li>
                    </ul>
                  </li>
                </ol>
              </section>
              <section className="experience">
                <h6>Internship</h6>
                <ol>
                  <li>
                    <header>
                      <p className="sanserif">{resumes?.extraCurricularActivities?.slice(0, 5)[0]?.functionTitle}</p>
                      <time>{resumes?.extraCurricularActivities?.slice(0, 5)[0]?.startDate.slice(0, 7)} {resumes?.extraCurricularActivities?.slice(0, 5)[0]?.endDate.slice(0, 7)}</time>
                    </header>
                    <span>{resumes?.extraCurricularActivities?.slice(0, 5)[0]?.employer}</span>
                    <ul>
                      <li>{resumes?.extraCurricularActivities?.slice(0, 5)[0]?.city}</li>
                      <li>{resumes?.extraCurricularActivities?.slice(0, 5)[0]?.description?.slice(0 ,10)}</li>
                    </ul>
                  </li>
                  <li>
                    <header>
                      <p className="sanserif">{resumes?.extraCurricularActivities?.slice(0, 5)[1]?.functionTitle}</p>
                      <time>{resumes?.extraCurricularActivities?.slice(0, 5)[1]?.startDate.slice(0, 7)} {resumes?.extraCurricularActivities?.slice(0, 5)[1]?.endDate.slice(0, 7)}</time>
                    </header>
                    <span>{resumes?.extraCurricularActivities?.slice(0, 5)[1]?.employer}</span>
                    <ul>
                      <li>{resumes?.extraCurricularActivities?.slice(0, 5)[1]?.city}</li>
                      <li>{resumes?.extraCurricularActivities?.slice(0, 5)[1]?.description?.slice(0 ,10)}</li>
                    </ul>
                  </li>
                  <li>
                    <header>
                      <p className="sanserif">{resumes?.extraCurricularActivities?.slice(0, 5)[2]?.functionTitle}</p>
                      <time>{resumes?.extraCurricularActivities?.slice(0, 5)[2]?.startDate.slice(0, 7)} {resumes?.extraCurricularActivities?.slice(0, 5)[1]?.endDate.slice(0, 7)}</time>
                    </header>
                    <span>{resumes?.extraCurricularActivities?.slice(0, 5)[2]?.employer}</span>
                    <ul>
                      <li>{resumes?.extraCurricularActivities?.slice(0, 5)[2]?.city}</li>
                      <li>{resumes?.extraCurricularActivities?.slice(0, 5)[2]?.description?.slice(0 ,10)}</li>
                    </ul>
                  </li>
                </ol>
              </section>
              <section className="education">
                <h6>Education</h6>
                <ol>
                  <li>
                    <div>
                      <p className="sanserif">
                      {resumes?.education?.slice(0, 5)[0]?.degreeName} 
                      </p>
                      <time>{resumes?.education?.slice(0, 5)[0]?.startDate.slice(0, 7)} {resumes?.education?.slice(0, 5)[0]?.enddate.slice(0, 7)}</time>
                    </div>
                    
                      <span>{resumes?.education?.slice(0, 5)[0]?.schoolName}</span>
                      <br />
                      <span>{resumes?.education?.slice(0, 5)[0]?.description.slice(0, 160)}</span>
                  </li>
                </ol>
              </section>
              <br />
                  <li>
                    <div>
                      <p className="sanserif">
                      {resumes?.education?.slice(0, 5)[1]?.degreeName} 
                      </p>
                      <time>{resumes?.education?.slice(0, 5)[1]?.startDate.slice(0, 7)} {resumes?.education?.slice(0, 5)[1]?.enddate.slice(0, 7)}</time>
                    </div>
                    
                      <span>{resumes?.education?.slice(0, 5)[1]?.schoolName}</span>
                      <br />
                      <span>{resumes?.education?.slice(0, 5)[1]?.description.slice(0, 160)}</span>
                  </li>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}

export default showResume;
