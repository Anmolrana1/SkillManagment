import React, { useEffect, useState } from "react";
import UserNavbar from "./UserNavbar";
import axios from "axios";

function Skill() {
  const [skillDetails, setSkillDetails] = useState({
    Email: "",
    skillName: "",
    Proficiency: "Beginner",
  });
  const [Email,setEmail]=useState('');
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const Email = localStorage.getItem("email");
    setEmail(Email)
    setSkillDetails((prev) => ({
      ...prev,
      Email: Email,
    }));

    async function fetchData() {
      try {
        const response = await axios.post(
          "http://localhost:5000/profile/getSkill",
          { Email }
        );
        console.log(response.data.user); 
        setUserData(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving user data:", error);
        setError("Error retrieving user data. Please try again later.");
        setLoading(false);
      }
    }
    fetchData();
  }, []);

 

  const handleChange = (e, fieldName) => {
    const value = e.target.value;
    setSkillDetails((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!skillDetails.skillName) {
      alert("Please fill in skill Name");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/profile/setSkill",
        skillDetails
      );
  
      if (response.status === 200) {
        alert("Skill added successfully");
        // Fetch the updated list of skills after adding the new skill
        const updatedResponse = await axios.post(
          "http://localhost:5000/profile/getSkill",
          { Email }
        );
        console.log(updatedResponse.data.user);
        // Update the userData state with the updated list of skills
        setUserData(updatedResponse.data.user);
        setSkillDetails({ Email: Email, skillName: "", Proficiency: "Beginner" });
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Skill already exists or there was an issue adding the skill");
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
                style={{ fontFamily: 'monospace', fontWeight: "bold" ,}}
              >
                Add Skill
              </h2>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Skill Name:</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="skillName"
                        value={skillDetails.skillName}
                        onChange={(e) => handleChange(e, "skillName")}
                        placeholder="Enter skill name"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Proficiency Level:</td>
                    <td>
                      <div className="dropdown">
                        <select
                          className="form-select"
                          id="proficiency"
                          onChange={(e) => handleChange(e, "Proficiency")}
                          value={skillDetails.Proficiency}
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit" className="btn btn-primary btn-block mt-4">
                Add Skill
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <h3 style={{fontFamily: 'monospace',fontWeight:"bolder"}}>Your Skills</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : userData.length > 0 ? (
          <div className="row">
            {userData.map((item) => (
              <div className="col-md-4 mb-4" key={item._id}>
                <div className="card" style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",borderRadius:'2rem' }}>
                  <div className="card-body">
                    <h3 className="card-title">{item.skillName?item.skillName.toUpperCase():''}</h3>
                    <p className="card-text"><b>Proficiency Level:</b> {item.Proficiency?item.Proficiency:''}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No Skills To Show</p>
        )}
      </div>
    </>
  );
}

export default Skill;
