import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper, Typography, Grid, Avatar } from "@mui/material";
import { Container } from "react-bootstrap";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserNavbar from "./UserNavbar";
function UserDashBoard() {
  const [Email, setEmail] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "http://localhost:5000/profile/userprofile",
          { Email }
        );
        console.log(response.data.user); // Logging the user data
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    }

    if (Email !== "") {
      fetchData();
    }
  }, [Email]);
  //border:"1px solid black" style={{border:"1px solid black"}}
  return (
    <div  style={{ backgroundColor: "rgb(220, 220, 220)",height:"100vh" }} >
      <UserNavbar />
      <Paper 
        elevation={3}
        style={{
          padding: "20px",
          maxWidth: "700px",
          margin: "40px auto",
          borderRadius: "2rem",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
        className="mt-2"
      >
        <Grid
          item
          xs={12}
          md={4}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Avatar sx={{ width: 120, height: 120 ,backgroundColor:"rgb(50, 50, 150)"}}>
            <AccountCircleIcon sx={{ width: 100, height: 100 }} />
          </Avatar>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
           
            style={{ marginTop: "2rem" ,fontWeight:"bolder",}}
          >
            USER PROFILE
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Container className="mt-4 d-flex justify-content-center">
            <table className=" table ">
              <tbody>
                <tr>
                  <td>
                    <strong>First Name:</strong>
                  </td>
                  <td>{userData.FirstName?.toUpperCase()}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Last Name:</strong>
                  </td>
                  <td>{userData.LastName?.toUpperCase()}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Designation:</strong>
                  </td>
                  <td>{userData.Designation?.toUpperCase()}</td>
                </tr>
                <tr>
                  <td>
                    <strong>EmpID:</strong>
                  </td>
                  <td>{userData.Empid}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email:</strong>
                  </td>
                  <td>{userData.Email?.toUpperCase()}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Phone:</strong>
                  </td>
                  <td>{userData.phone}</td>
                </tr>
                <tr>
                  <td>
                    <strong>DOJ:</strong>
                  </td>
                  <td>{userData.DOJ}</td>
                </tr>
              </tbody>
            </table>
          </Container>
        </Grid>
      </Paper>
    </div>
  );
}

export default UserDashBoard;
