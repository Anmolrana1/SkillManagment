import React, { useState } from "react";
import UserSidebar from "../user/UserSidebar";
import axios from "axios";

const EmployeeRecommendations = () => {
  const [Requirements,setRequirement]=useState({
    techStack:[],
    proficiency:[]
  })
  const [recommendations, setRecommendations] = useState([]);

  const handleChange=(e)=>{
    const value = e.target.value;
    const name=e.target.value;

      const updatedTechStack = [...Requirements.name];
      const index = updatedTechStack.indexOf(value);

      if (index === -1) {
        updatedTechStack.push(value);
      } else {
        updatedTechStack.splice(index, 1);
      }

      setRequirement((prev) => ({
        ...prev,
        name: updatedTechStack,
      }));
    }
    
  

  const handleRecommendations = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/recommend", {
        tech_stack: techStack,
        proficiency: proficiency,
      });
      console.log(response);
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <UserSidebar />
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
            color: "#333",
            marginBottom: "20px",
            margin: "2rem",
            textDecoration: "underline",
          }}
        >
          Employees Recommendation
        </h1>
        <div style={{ marginBottom: "20px" }}>
          <table>
            <tr style={{ marginBottom: "20px" }}>
              <td>
                <label htmlFor="techStack" style={{ marginRight: "10px" }}>
                  Enter a skill:
                </label>
              </td>
              <td>
                <input
                  type="text"
                  style={{ width: "100%" }}
                  name="proficiency"
                  className="form-control"
                  
                  onChange={handleChange(e)}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label htmlFor="proficiency" style={{ marginRight: "10px" }}>
                  Proficiency Level:
                </label>
              </td>
              <td>
                <select
                  className="form-select"
                  id="proficiency"
                  name="techStack"
                  onChange={handleChange(e)}
                  
                >
                  <option value="">Select a Proficiency Level...</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </td>
            </tr>
            <tr>
                <td colSpan={2}><button type="submit" className="btn btn-primary btn-block mt-4">
                    Add skill
              </button></td>
            </tr>
          </table>
        </div>
        

        <div>
            <div></div>
        </div>

        <button
          onClick={handleRecommendations}
          style={{ marginBottom: "20px" }}
        >
          Get Recommendations
        </button>
        <div>
          <h3>Top 10 Employee Recommendations:</h3>
          <ul>
            {recommendations.map((recommendation, index) => (
              <li key={index}>
                {recommendation.Name} - Similarity Score:{" "}
                {recommendation.similarity_score}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRecommendations;
