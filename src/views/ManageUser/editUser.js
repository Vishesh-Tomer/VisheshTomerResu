import React from 'react'
import { useHistory, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const editUser = () => {
    const history = useHistory();
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
        <form >
        <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your Email"
              name="email"
            //   value={name}
            //   onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
            //   value={name}
            //   onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your role"
              name="role"
            //   value={username}
            //   onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Your phone number"
              name="phone"
            //   value={email}
            //   onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter Your Date of birth"
              name="dob"
            //   value={phone}
            //   onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your gender"
              name="gender"
            //   value={website}
            //   onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Address"
              name="address"
            //   value={website}
            //   onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Your ZipCode"
              name="zipcode"
            //   value={website}
            //   onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update User</button>
          <Link
                    className="btn btn-outline-primary"
                    onClick={() => {
                        history.push("/admin/manageuser");
                      }}
                  >
                    Click here to back
            </Link>
        </form>
      </div>
    </div>
  )
}

export default editUser