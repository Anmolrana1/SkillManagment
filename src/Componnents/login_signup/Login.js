import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginSignupNavbar from "./LoginSignupNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [loginData, setloginData] = useState({ Email: "", Password: "" });


  //login function 
  const handleLogin = async () => {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regex
    if (regex.test(loginData.Email)) {
      console.log("Valid email address!");
    } else {
      alert("Invalid email address!");
      return;
    }
    //checking input  fields
    if (!loginData.Email || !loginData.Password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      console.log("loginData", loginData);
      const response = await axios.post(
        "http://localhost:5000/auth/userData",
        loginData
      );
      if (response.status === 200) {
        console.log("Login successful");
        // Extract token from response
        const token = response.data.token;
        const decoded = jwtDecode(token);
        console.log("decoded token:", decoded);
        localStorage.setItem("email",loginData.Email)
          navigate("/userdashboard");
      }
      if(response.status === 201) {
        
        alert("Incorrect Password");
        console.error("incorrect failed");
      }if(response.status === 404) {
        alert("user Not found");
        console.error("incorrect failed");
      }
    } catch (error) {
      alert("User Not Found");
      console.error("Error logging in:", error);
    }
  };

  const handleReset = async () => {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(loginData.Email)) {
      console.log("Valid email address!");
    } else {
      alert("Invalid email address!");
      return;
    }

    if (!loginData.Email) {
      alert("Please fill in your email address.");
      return;
    }

    try {
      console.log("loginData", loginData);
      await axios.post(
        "http://localhost:5000/auth/SendResetMail",
        loginData
      );
      alert("Password reset email sent successfully");
    } catch (error) {
      alert("Error sending password reset email:", error);
    }
  };

  const handleChange = (e, fieldName) => {
    const value = e.target.value;
    setloginData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <section class="vh-100" style={{ backgroundColor: "rgb(5, 5, 83)" }}>
      <LoginSignupNavbar/>
      <div class="container py-8 h-1000 mt-5">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-10">
            <div class="card" style={{ borderRadius: "2rem" }}>
              <div class="row ">
                <div class="col-md-6 col-lg-5 d-none d-md-block mt-5">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/002/999/216/non_2x/user-password-login-vector.jpg"
                    alt="login form"
                    class="img-fluid "
                    style={{ borderRadius: " 1rem 0 0 1rem" }}
                  />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div
                    class="card-body p-4 p-lg-5 text-black shadow-lg p-3 bg-white "
                    style={{ borderRadius: "2rem" }}
                  >
                    <form>
                      <div class="d-flex align-items-center justify-content-center mb-3 pb-1">
                        <i
                          class="fas fa-cubes  fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span class="h1 fw-bold  mb-0 ">Login</span>
                      </div>

                      <h5
                        class="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: " 1px" }}
                      >
                        Sign into your account
                      </h5>

                      <div class="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example17"
                          class="form-control form-control-lg"
                          placeholder="Enter your email"
                          required
                          onChange={(e) => handleChange(e, "Email")}
                        />
                        <label class="form-label" for="form2Example17">
                          Email address*
                        </label>
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          class="form-control form-control-lg"
                          placeholder="Enter your password"
                          required
                          onChangeCapture={(e) => handleChange(e, "Password")}
                        />
                        <label class="form-label" for="form2Example27">
                          Password*
                        </label>
                      </div>

                      <div class="pt-1 mb-4">
                        <button
                          class="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={() => handleLogin()}
                        >
                          Login
                        </button>
                      </div>

                        <a
                          class="small text-muted"
                          href="#!"
                          onClick={() => handleReset()}
                        >
                          Forgot password?
                        </a>
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

export default Login;
