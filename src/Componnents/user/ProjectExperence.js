import React, { useEffect, useState } from "react";
import UserNavbar from "./UserNavbar";
import axios from "axios";

function ProjectExperence() {

  const [projectDetails, setprojectDetails] = useState({
    Email: "",
    projectName: "",
    projectType: "",
    description: "",
    startDate: "",
    endDate: "",
    role: "",
    Status: "",
  });

  const [Email, setEmail] = useState("");
  const [userProjects, setUserProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const Email = localStorage.getItem("email");
    setEmail(Email);
    setprojectDetails((prev) => ({
      ...prev,
      Email: Email,
      Status: "Pending"
    }));

    async function fetchProjects() {
      try {
        const response = await axios.post(
          "http://localhost:5000/profile/getProjectExperiences",
          { Email }
        );
        setUserProjects(response.data.projects);
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving user projects:", error);
        setError("Error retrieving user projects. Please try again later.");
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const handleChange = (e, fieldName) => {
    const value = e.target.value;
    setprojectDetails((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectDetails.projectName) {
      alert("Please fill in project Name");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/profile/addProjectExperience",
        projectDetails
      );

      if (response.status === 200) {
        alert("Project experience added successfully");
        // Fetch the updated list of projects after adding the new project
        const updatedResponse = await axios.post(
          "http://localhost:5000/profile/getProjectExperiences",
          { Email }
        );
        setUserProjects(updatedResponse.data.projects);
        setprojectDetails({
          Email: "",
          projectName: "",
          projectType: "",
          description: "",
          startDate: "",
          endDate: "",
          role: "",
          Status: "",
        });
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Project already exists or there was an issue adding the project");
    }
  };
  return (
    <>
      <UserNavbar />
      <div
        className="container mt-4 p-4"
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          borderRadius: "2rem",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="custom-form mt-4" onSubmit={handleSubmit}>
              <h2
                className="mb-4"
                style={{ fontFamily: "monospace", fontWeight: "bold" }}
              >
                Add Project Experience
              </h2>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Project Name:</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="projectName"
                        value={projectDetails.projectName}
                        onChange={(e) => handleChange(e, "projectName")}
                        placeholder="Enter project name"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Description:</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={projectDetails.description}
                        onChange={(e) => handleChange(e, "description")}
                        placeholder="Enter project description"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Start Date:</td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        id="startDate"
                        value={projectDetails.startDate}
                        onChange={(e) => handleChange(e, "startDate")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>End Date:</td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        id="endDate"
                        value={projectDetails.endDate}
                        onChange={(e) => handleChange(e, "endDate")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Project Type:</td>
                    <td>
                      <select
                        className="form-select"
                        id="role"
                        onChange={(e) => handleChange(e, "projectType")}
                        value={projectDetails.projectType}
                      >
                        <option value="">Select project type</option>
                        <option value="Data Analysis">Data Analysis</option>
                        <option value="Data Visualization">
                          Data Visualization
                        </option>
                        <option value="Data Mining">Data Mining</option>
                        <option value="Big Data">Big Data</option>
                        <option value="Business Intelligence">
                          Business Intelligence
                        </option>
                        <option value="Predictive Analytics">
                          Predictive Analytics
                        </option>
                        <option value="Machine Learning">
                          Machine Learning
                        </option>
                        <option value="Natural Language Processing">
                          Natural Language Processing
                        </option>
                        <option value="Deep Learning">Deep Learning</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Role:</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="role"
                        value={projectDetails.role}
                        onChange={(e) => handleChange(e, "role")}
                        placeholder="Enter your role in the project"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit" className="btn btn-primary btn-block mt-4">
                Add Project Experience
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container mt-5">
  <h3 className="mb-4" style={{ fontFamily: "monospace", fontWeight: "bolder" }}>
    Your Project Experiences
  </h3>
  {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>{error}</p>
  ) : userProjects ? (
    <div className="table-responsive">
      <table className="table" style={{ }}>
        <thead>
          <tr style={{ height: "60px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
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
            <tr key={item._id} style={{ height: "60px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
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


    </>
  );
}

export default ProjectExperence;
