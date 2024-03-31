import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import UserNavbar from "../user/UserNavbar";
import { jwtDecode } from "jwt-decode";

function Signup() {
  const [userData, setUserData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    phone: "",
    Empid:"",
    Password: generateRandomPassword(),
    Designation: "",
    DOJ: "",
    Role: "",
  });

  const handleChange = (e, fieldName) => {
    const value = e.target.value;
    setUserData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleClick = async () => {
    if (!userData.FirstName || !userData.Email || !userData.phone || !userData.Designation || !userData.DOJ || !userData.Role) {
      alert("Please fill in all required fields.");
      return;
    }
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(userData.Email)) {
      console.log("Valid email address!");
    } else {
      alert("Invalid email address!");
      return;
    }
    if(userData.phone.length!==10){
      alert("Phone number should be of 10 digits");
      return;
    }
    
    console.log("user data", userData);
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signup",
        userData
      );
      
      if (response.status === 200) {
        // Extract token from response
        alert("User created successfully");
        setUserData({
          FirstName: "",
          LastName: "",
          Email: "",
          phone: "",
          Empid:"",
          Password: generateRandomPassword(),
          Designation: "",
          DOJ: "",
          Role: "",
        });
        const token = response.data.token;
        const decoded = jwtDecode(token);
        console.log("decoded token:", decoded);
        
      } else if (response.status === 400) {
        alert("User already exists");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      alert(alert("User already exists"));
    }
  };

  function generateRandomPassword() {
    const length = 8;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  return (
    <section
      className="vh-1000"
      style={{ backgroundColor: "rgb(5, 5, 83)" }}
    >
      <UserNavbar/>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100" style={{ padding: "5rem", paddingTop: "2rem" }}>
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "2rem" }}>
              <div className="card-body p-md-5" >
                <div className="row justify-content-center ">
                  <div className="col-md-6 col-lg-5 d-none d-md-block mt-5">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/002/999/216/non_2x/user-password-login-vector.jpg"
                      alt="login form"
                      className="img-fluid "
                      style={{ borderRadius: " 1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-10 col-lg-7 col-xl-7 order-2 order-lg-1" >
                    <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-2 mt-2">
                      User Creation
                    </p>

                    <form className="mx-1 mx-md-6">
                      <div className="row mb-4">
                        <div className="col-6">
                          <div className="form-outline" style={{ width: "100%" }}>
                            <input
                              type="text"
                              id="formFirstName"
                              className="form-control"
                              onChange={(e) => handleChange(e, "FirstName")}
                              value={userData.FirstName}
                              placeholder="First Name"
                              required
                            />
                            <label className="form-label" htmlFor="formFirstName">First Name *</label>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-outline" style={{ width: "100%" }}>
                            <input
                              type="text"
                              id="formLastName"
                              className="form-control"
                              onChange={(e) => handleChange(e, "LastName")}
                              placeholder="Last Name"
                              value={userData.LastName}
                            />
                            <label className="form-label" htmlFor="formLastName">Last Name</label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col">
                          <div className="form-outline" style={{ width: "100%" }}>
                            <input
                              type="date"
                              id="doj"
                              className="form-control"
                              onChange={(e) => handleChange(e, "DOJ")}
                              value={userData.DOJ}
                              required
                            />
                            <label className="form-label" htmlFor="doj">Date of Joining *</label>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-outline" style={{ width: "100%" }}>
                            <input
                              type="email"
                              id="formEmail"
                              className="form-control"
                              onChange={(e) => handleChange(e, "Email")}
                              value={userData.Email}
                              placeholder="Email"
                              required
                            />
                            <label className="form-label" htmlFor="formEmail">Email *</label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-4">
                        
                        <div className="col">
                          <div className="form-outline" style={{ width: "100%" }}>
                            <input
                              type="tel"
                              id="Empid"
                              className="form-control"
                              onChange={(e) => handleChange(e, "Empid")}
                              value={userData.Empid}
                              placeholder="Employee Id"
                              required
                            />
                            <label className="form-label" htmlFor="Empid">Employee Id *</label>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-outline" style={{ width: "100%" }}>
                            <input
                              type="text"
                              id="formDesignation"
                              className="form-control"
                              onChange={(e) => handleChange(e, "Designation")}
                              value={userData.Designation}
                              placeholder="Designation"
                              required
                            />
                            <label className="form-label" htmlFor="formDesignation">Designation *</label>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                          <div className="form-outline" style={{ width: "100%" }}>
                            <input
                              type="tel"
                              id="formPhone"
                              className="form-control"
                              onChange={(e) => handleChange(e, "phone")}
                              value={userData.phone}
                              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                              title="Phone number must be in the format xxx-xxx-xxxx"
                              placeholder="Phone Number"
                              required
                            />
                            <label className="form-label" htmlFor="formPhone">Phone Number *</label>
                          </div>
                        </div>

                      <div className="row mb-4 mt-3" >
                        <div className="col" style={{ display: "flex", justifyContent: "space-between" }}>
                          <label className="form-label">Role *</label>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="role"
                              id="admin"
                              value="Admin"
                              onChange={(e) => handleChange(e, "Role")}
                              required
                            />
                            <label className="form-check-label" htmlFor="admin">Admin</label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="role"
                              id="user"
                              value="User"
                              onChange={(e) => handleChange(e, "Role")}
                              required
                            />
                            <label className="form-check-label" htmlFor="user">User</label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="role"
                              id="Approver"
                              value="Approver"
                              onChange={(e) => handleChange(e, "Role")}
                              required
                            />
                            <label className="form-check-label" htmlFor="Approver">Approver</label>
                          </div>
                        </div>
                      </div>

                      
                      
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={() => handleClick()}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
