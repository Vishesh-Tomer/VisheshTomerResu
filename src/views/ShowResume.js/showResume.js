import React, { useEffect, useState } from "react";
import "./Styleresume.scss"
import { getResume } from "Service/auth";
import { useHistory } from "react-router-dom";

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
  Col
} from "react-bootstrap";


function showResume() {

  const history = useHistory();
  const [resumeInfo, setResumeInfo] = useState({});



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


  // const resobject = JSON.parse(localStorage.getItem("resObje1"))
  // const id = resobject.id
  // console.log(id)
  useEffect(() => {
    const getData = async () => {
      const response = await getResume();
      console.log("getAdmin", response);
      setResumeInfo(response?.data);   
    };
    getData();
  }, []);
 

  
  return (
    <>
      {/* <div>
        <div id="other-body1-stuff">Hi stuff goes here</div>
        <div id="pdf">
          <div id="header">
            <div id="header-left">
              <div>
                <i className="fa fa-envelope"></i>{" "}
                <a href="mailto:email@email.com">{resumeInfo.email}</a>
              </div>
              <div>
                <i className="fa fa-phone"></i>{" "}
                <a href="tel:555-555-1234">{resumeInfo.phone}</a>
              </div>
            </div>
            <div id="header-middle">
              <p>William Kwok</p>
            </div>
            <div id="header-right">
              <div>
                <a href="https://github.com/kwokwilliam">kwokwilliam</a>{" "}
                <i className="fa fa-github"></i>
              </div>
              <div>
                <a href="https://linkedin.com/in/william-w-kwok">
                  william-w-kwok
                </a>{" "}
                <i className="fa fa-linkedin"></i>
              </div>
              <div>
                <a href="https://williamk.info/?q=resexample">williamk.info</a>{" "}
                <i className="fa fa-globe"></i>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="section-header">
              <i className="fa fa-graduation-cap"></i> EDUCATION
            </div>
            <div className="item">
              <div className="item-header">
                <div className="item-title">
                  University of Washington - Seattle, Washington
                </div>
                <div className="item-date">Sept 2016 - Jun 2020</div>
              </div>
              <ul>
                <li>GPA: 4/4</li>
                <li>Bachelor of Science in Underwater Basket Weaving</li>
                <li>Clubs: None</li>
              </ul>
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <i className="fa fa-briefcase"></i> Employment History
            </div>
            <div className="item">
              <div className="item-header">
                <div className="item-title">{resumeInfo.id}</div>
                <div className="item-date"> Job Title :- {resumeInfo.jobTitle}</div>
                <br />
                <div className="item-date"> Is Present:- {resumeInfo.isPresent}</div>
              </div>
              <ul>
                <li>
                Employer :-{resumeInfo.employer}
                </li>
                <br></br>
                <li>
                Job Start Date :- {resumeInfo.startDate}
                </li>
                <br></br>
                <li>
                Job End Date :- {resumeInfo.endDate}
                </li>
                <br></br>
               
                <div className="item-date"> Is Present:- {resumeInfo.isPresent}</div>
           
                <br></br>
                <li>
                Job Location :-{resumeInfo.city}
                </li>
                <br></br>
                <li>
                Description :-{resumeInfo.description}
                </li>
              </ul>
            </div>
            <div className="item">
              <div className="item-header">
                <div className="item-title">Job 2</div>
                <div className="item-date">Sept 2016 - Jun 2020</div>
              </div>
              <ul>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et.
                </li>
                <li>
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip.
                </li>
                <li>
                  commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat.
                </li>
                <li>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est.
                </li>
              </ul>
            </div>
            <div className="item">
              <div className="item-header">
                <div className="item-title">Job 3</div>
                <div className="item-date">Sept 2016 - Jun 2020</div>
              </div>
              <ul>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et.
                </li>
                <li>
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip.
                </li>
                <li>
                  commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat.
                </li>
                <li>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est.
                </li>
              </ul>
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <i className="fa fa-code"></i> PROJECTS
            </div>
            <div className="item">
              <div className="item-header">
                <div className="item-title">Project 1</div>
                <div className="item-date">Sept 2016 - Jun 2020</div>
              </div>
              <ul>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et.
                </li>
                <li>
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip.
                </li>
                <li>
                  commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat.
                </li>
                <li>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est.
                </li>
              </ul>
            </div>
            <div className="item">
              <div className="item-header">
                <div className="item-title">Project 2</div>
                <div className="item-date">Sept 2016 - Jun 2020</div>
              </div>
              <ul>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et.
                </li>
                <li>
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip.
                </li>
                <li>
                  commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat.
                </li>
                <li>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est.
                </li>
              </ul>
            </div>
            <div className="item">
              <div className="item-header">
                <div className="item-title">Project 3</div>
                <div className="item-date">Sept 2016 - Jun 2020</div>
              </div>
              <ul>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et.
                </li>
                <li>
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip.
                </li>
                <li>
                  commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat.
                </li>
                <li>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est.
                </li>
                <li>
                  commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat.
                </li>
              </ul>
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <i className="fa fa-wrench"></i> SKILLS
            </div>
            <div className="item">
              <ul>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et.
                </li>
                <li>
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip.
                </li>
                <li>
                  commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat.
                </li>
                <li>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}

     
        <section id="save">
            <section className="sheet">
                <aside>
                    <section className="contact">
                        <h6>Contact</h6>
                        <ul>
                            <li>
                                <p><i className="fa fa-map-marker-alt" title="Location"></i> San Francisco, CA</p>
                            </li>
                            <li>
                                <p><i className="fa fa-phone" title="Cell phone"></i> <a href="tel:4153234000">(415) 323-4000</a></p>
                            </li>
                            <li>
                                <p><i className="fa fa-envelope" title="Email"></i> <a href="mailto:joe@joesmith.site">joe@joesmith.site</a></p>
                            </li>
                            <li>
                                <p><i className="fa fa-globe-americas" title="Website"></i> <a href="https://joesmith.site">joesmith.site</a></p>
                            </li>
                            <li>
                                <p><i className="fab fa-github" title="GitHub"></i> <a href="https://github.com/Tombarr">github.com/Tombarr</a></p>
                            </li>
                        </ul>
                    </section>
                    <section className="skills">
                        <h6>Skills</h6>
                        <ul>
                            <li><span>Responsive Design</span></li>
                            <li><span>Mobile Development</span></li>
                            <li><span>Usability Testing</span></li>
                            <li><span>Data Visualization</span></li>
                            <li><span>A/B Testing</span></li>
                        </ul>
                    </section>
                    <section className="skills">
                        <h6>Technologies</h6>
                        <ul>
                            <li><span>JavaScript</span></li>
                            <li><span>PHP</span></li>
                            <li><span>HTML5</span></li>
                            <li><span>CSS3</span></li>
                            <li><span>Bootstrap</span></li>
                            <li><span>React</span></li>
                        </ul>
                    </section>
                    <section className="references">
                        <h6>References</h6>
                        <address>
                            Jane Doe<br />
                            Alphabet Inc.<br />
                            (413) 025-1900
                            jane@janedoe.site
                        </address>
                        <address>
                            Luke O'Connor<br />
                            Facebook<br />
                            (413) 125-1400
                            luke@facebook.site
                        </address>
                        <p>Typeset in HTML &amp; CSS<br />
                        See <a href="https://git.io/f4dXp">git.io/f4dXp</a></p>
                    </section>
                </aside>
                <section>
                    <header className="name" aria-label="Joe Smith">
                        {/* <a href="https://joesmith.site">
                            <svg width="257px" height="35px" viewBox="0 0 257 35" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" font-family="Montserrat-Regular, Montserrat" font-size="48" font-weight="normal">
                                    <g id="Letter" transform="translate(-54.000000, -140.000000)" fill="#484848">
                                        <text id="JOE-SMITH">
                                            <tspan x="54.728" y="174">JOE SMITH</tspan>
                                        </text>
                                    </g>
                                </g>
                            </svg>
                        </a> */}
                        <h6>Software Engineer Extraordinaire</h6>
                        <hr />
                    </header> 
                    <section>
                        <section className="summary">
                            <h6>Summary</h6>
                            <p>Deadline-oriented software engineer with lots of experience.
                                Solid track record of architecting solutions that exceed client expectations.</p>
                        </section>
                        <section className="experience">
                            <h6>Experience</h6>
                            <ol>
                                <li>
                                    <header>
                                        <p className="sanserif">Senior Software Engineer</p>
                                        <time>2016 – Present</time>
                                    </header>
                                    <span>Google</span>
                                    <ul>
                                        <li>Developed scalable database indexing technology</li>
                                        <li>Created GraphQL APIs for accessing Google Earth</li>
                                        <li>Leveraged Waymo datasets to double traffic statistics accuracy</li>
                                    </ul>
                                </li>
                                <li>
                                    <header>
                                        <p className="sanserif">Software Engineer</p>
                                        <time>2014 – 2016</time>
                                    </header>
                                    <span>Facebook</span>
                                    <ul>
                                        <li>Collected political affiliation data from millions of users</li>
                                        <li>Authored user stories and mapped user journeys</li>
                                        <li>Introduced regression testing to Yoga layout framework</li>
                                    </ul>
                                </li>
                                <li>
                                    <header>
                                        <p className="sanserif">Software Engineer Intern</p>
                                        <time>2013 – 2014</time>
                                    </header>
                                    <span>Twitter</span>
                                    <ul>
                                        <li>Analyzed and optimized code coverage across Scala architecture</li>
                                        <li>Created project environment setup XML files</li>
                                        <li>Maintained TCP/IP connections with 250,000 concurrent users</li>
                                    </ul>
                                </li>
                                <li>
                                    <header>
                                        <p className="sanserif">Independent iOS Engineer</p>
                                        <time>2012 – Present</time>
                                    </header>
                                    <ul>
                                        <li>Developed SuperUltraCoolWeather app using AccuWeather API</li>
                                        <li>Shipped products to more than 1,000,000 daily active users</li>
                                    </ul>
                                </li>
                            </ol>
                        </section>
                        <section className="education">
                            <h6>Education</h6>
                            <ol>
                                <li>
                                    <div>
                                        <p className="sanserif">M.S., Human Computer Interaction</p>
                                        <time>Sept '12 – May '14</time>
                                    </div>
                                    <div>
                                        <span>Massachusetts Institute of Technology</span>
                                        <span></span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <p className="sanserif">B.S., Computer Science</p>
                                        <time>Sept '08 – May '12</time>
                                    </div>
                                    <div>
                                        <span>Harvard University</span>
                                        <span>GPA: 3.91</span>
                                    </div>
                                </li>
                            </ol>
                        </section>
                    </section>
                </section>
            </section>
        </section>
        <Row>
              <Col xs="12">
                  <div className="editDetail">
                    <button
                      className="btn addBtn"
                      onClick={() => {
                        history.push("/editresume");
                      }}
                    >
                      Update Resume
                    </button>
                  </div>
                </Col>
          </Row>
     
    </>
  );
}

export default showResume;
