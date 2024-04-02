import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import UserNavbar from "../user/UserNavbar";
import axios from "axios";
import { Container } from 'react-bootstrap';

function EmployeeDetails() {
  const [searchQuery, setSearchQuery] = useState("");
  const [Email, setEmail] = useState('');
  const [Employee, setEmployee] = useState(false);
  const [userDataShow, setUserDataShow] = useState(false);
  const [userCertificatesShow, setUserCertificatesShow] = useState(false);
  const [userProjectsShow, setUserProjectsShow] = useState(false);
  const [userSkillShow, setUserSkillShow] = useState(false);
  const [userData, setUserData] = useState({});
  const [userCertificates, setUserCertificates] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [userSkill, setUserSkill] = useState([]);
  const [error, setError] = useState('');

  const handleProfile = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/profile/userprofile",
        { Email }
      );
      setUserData(response.data.user);
      setUserDataShow(true);
      setUserCertificatesShow(false);
      setUserProjectsShow(false);
      setUserSkillShow(false);
    } catch (error) {
      setError('Error retrieving user profile');
      console.error("Error retrieving user profile:", error);
    }
  }

  const handleSkill = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/profile/getSkill",
        { Email }
      );
      setUserSkill(response.data.user);
      setUserDataShow(false);
      setUserCertificatesShow(false);
      setUserProjectsShow(false);
      setUserSkillShow(true);
    } catch (error) {
      setError('Error retrieving user skills');
      console.error("Error retrieving user skills:", error);
    }
  }

  const handleCertificate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/profile/getCertificates",
        { Email }
      );
      setUserCertificates(response.data.certificates);
      setUserDataShow(false);
      setUserCertificatesShow(true);
      setUserProjectsShow(false);
      setUserSkillShow(false);
    } catch (error) {
      setError('Error retrieving user certificates');
      console.error("Error retrieving user certificates:", error);
    }
  }

  const handleExperience = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/profile/getProjectExperiences",
        { Email }
      );
      setUserProjects(response.data.projects);
      setUserDataShow(false);
      setUserCertificatesShow(false);
      setUserProjectsShow(true);
      setUserSkillShow(false);
    } catch (error) {
      setError('Error retrieving user project experiences');
      console.error("Error retrieving user project experiences:", error);
    }
  }

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/profile/getEmail",
        { Empid: searchQuery }
      );
      setEmail(response.data.Email);
      setEmployee(true);
      setSearchQuery('')
      setError('')
      setUserDataShow(false);
      setUserCertificatesShow(false);
      setUserProjectsShow(false);
      setUserSkillShow(false);
      if(response.status===400){
        setEmployee(false);
        alert('User Not Found')
      }
    } catch (error) {
      setError('User not found!');
      console.error("Error retrieving user Email:", error);
      setEmployee(false);
      setUserDataShow(false);
      setUserCertificatesShow(false);
      setUserProjectsShow(false);
      setUserSkillShow(false);
    }
  }

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <UserNavbar />
      <div className="mt-4" style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
        <b style={{ marginRight: '10px',fontSize:"large" }}>Enter Employee ID:</b>
        <TextField
          style={{ marginRight: '20px', width: '20rem' }}
          label="Emp_XX"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block ml-5" onClick={handleClick}>
          Get Employee Details
        </button>
      </div>
      {Employee &&   <div
        className="container mt-4 p-3"
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          borderRadius: "2rem",
        }}
      >
   
        <div>
          <button type="submit" className="btn btn-primary btn-block" style={{ marginRight: '20px' }} onClick={handleProfile}>
            Employee Details
          </button>
          <button type="submit" className="btn btn-primary btn-block" style={{ marginRight: '20px' }} onClick={handleCertificate}>
            Employee Certifications
          </button>
          <button type="submit" className="btn btn-primary btn-block" style={{ marginRight: '20px' }} onClick={handleSkill}>
            Employee Skills
          </button>
          <button type="submit" className="btn btn-primary btn-block" style={{ marginRight: '20px' }} onClick={handleExperience}>
            Employee Project Experience
          </button>
        </div>

      {/* Profile Section */}
      {userDataShow &&
      <div className="mt-4"><h3 className="mb-4" style={{ fontFamily: "monospace", fontWeight: "bolder" }}>Employee Details</h3>
      
        <Container className="mt-4 d-flex justify-content-center">
           
          <table className="text-left table table-bordered">
            <tbody>
              <tr>
                <td><strong>First Name:</strong></td>
                <td>{userData.FirstName?.toUpperCase()}</td>
              </tr>
              <tr>
                <td><strong>Last Name:</strong></td>
                <td>{userData.LastName?.toUpperCase()}</td>
              </tr>
              <tr>
                <td><strong>Designation:</strong></td>
                <td>{userData.Designation?.toUpperCase()}</td>
              </tr>
              <tr>
                <td><strong>EmpID:</strong></td>
                <td>{userData.Empid}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{userData.Email?.toUpperCase()}</td>
              </tr>
              <tr>
                <td><strong>Phone:</strong></td>
                <td>{userData.phone}</td>
              </tr>
              <tr>
                <td><strong>DOJ:</strong></td>
                <td>{new Date(userData.DOJ).toLocaleDateString('en-US')}</td>
              </tr>
            </tbody>
          </table>
        </Container>
        </div>
      }
      
      {/* Certificate Section */}
      {userCertificatesShow &&
        <div className="container mt-5">
          <h3 className="mb-4" style={{ fontFamily: "monospace", fontWeight: "bolder" }}>Employee Certificates</h3>
          {userCertificates.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Certificate Name</th>
                    <th scope="col">Issuing Organization</th>
                    <th scope="col">Issue Date</th>
                    <th scope="col">Expire Date</th>
                    <th scope="col">Credential ID</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userCertificates.map((item) => (
                    <tr key={item._id}>
                      <td>{item.certificateName ? item.certificateName.toUpperCase() : ""}</td>
                      <td>{item.issuingOrganization ? item.issuingOrganization.toUpperCase() : ""}</td>
                      <td>{new Date(item.issueDate).toLocaleDateString('en-US')}</td>
                      <td>{new Date(item.ExpireDate).toLocaleDateString('en-US')}</td>
                      <td>{item.credentialID ? item.credentialID.toUpperCase() : ""}</td>
                      <td>{item.Status ? item.Status.toUpperCase() : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No Certificates To Show</p>
          )}
        </div>
      }

      {/* Project Experience */}
      {userProjectsShow &&
        <div className="container mt-5">
          <h3 className="mb-4" style={{ fontFamily: "monospace", fontWeight: "bolder" }}>Employee Project Experiences</h3>
          {userProjects.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Project Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userProjects.map((item) => (
                    <tr key={item._id}>
                      <td>{item.projectName ? item.projectName.toUpperCase() : ""}</td>
                      <td>{item.description ? item.description.toUpperCase() : ""}</td>
                      <td>{new Date(item.startDate).toLocaleDateString('en-US')}</td>
                      <td>{new Date(item.endDate).toLocaleDateString('en-US')}</td>
                      <td>{item.role ? item.role.toUpperCase() : ""}</td>
                      <td>{item.Status ? item.Status.toUpperCase() : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No Project Experiences To Show</p>
          )}
        </div>
      }

      {/* Skill Details */}
      {userSkillShow &&
        <div className="container mt-5">
          <h3 style={{ fontFamily: 'monospace', fontWeight: "bolder" }}>Employee Skills</h3>
          {userSkill.length > 0 ? (
            <div className="row">
              {userSkill.map((item) => (
                <div className="col-md-4 mb-4" key={item._id}>
                  <div className="card" style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: '2rem' }}>
                    <div className="card-body">
                      <h3 className="card-title">{item.skillName ? item.skillName.toUpperCase() : ''}</h3>
                      <p className="card-text"><b>Proficiency Level:</b> {item.Proficiency ? item.Proficiency : ''}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No Skills To Show</p>
          )}
        </div>
      }

     <div className="mt-6" style={{ color: 'red',fontWeight:'bolder',fontSize:'larger', }}> {error && <p   >{error}</p>}</div>
     </div>}
    </>
  );
}

export default EmployeeDetails;
