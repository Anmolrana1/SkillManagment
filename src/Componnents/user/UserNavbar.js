import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import "./UserNavbar.css";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";

function UserNavbar() {
  const { isLoggedIn, logout } = useAuth();
  const [Role, setRole] = useState("");
  const [Email, setEmail] = useState("");
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "http://localhost:5000/profile/userprofile",
          { Email }
        );
        console.log(response.data.user);
        setRole(response.data.user.Role);
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    }

    if (Email !== "") {
      fetchData();
    }
  }, [Email]);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <AppBar position="static" className="p-2" style={{backgroundColor:"rgb(50, 50, 150)"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              className="menu"
              variant="h6"
              noWrap
              component={Link}
              
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Link
              to="/userdashboard"
              style={{ textDecoration: "none", marginLeft: "2rem" }}
              className="menu"
            >
              <Typography
                className="menu"
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Profile
              </Typography>
            </Link>
            <Link
              to="/Certificates"
              style={{ textDecoration: "none", marginLeft: "2rem" }}
              className="menu"
            >
              <Typography
                className="menu"
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Certificates
              </Typography>
            </Link>
            <Link
              to="/Skills"
              style={{ textDecoration: "none", marginLeft: "2rem" }}
              className="menu"
            >
              <Typography
                className="menu"
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                skills
              </Typography>
            </Link>
            <Link
              to="/ProjectExperence"
              style={{ textDecoration: "none", marginLeft: "2rem" }}
              className="menu"
            >
              <Typography
                className="menu"
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Project Experience
              </Typography>
            </Link>
            {Role === "Approver" ? (
              <div>
                <Typography
                  style={{ textDecoration: "none", marginLeft: "2rem" }}
                  variant="h6"
                  noWrap
                  className="menu"
                  onClick={handleClick}
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Approval Options
                </Typography>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  
                  <MenuItem onClick={handleClose} key={1}>
                    <Link
                      to="/CertificateForApp"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Certificates For Approval
                    </Link>
                  </MenuItem>
                  
                  <MenuItem onClick={handleClose} key={2}>
                    <Link
                      to="/ProjectForApproval"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Projects For Approval
                    </Link>
                  </MenuItem>
                  
                </Menu>
              </div>
            ) : (
              ""
            )}

            {Role === "Admin" ? (
              <>
                <Link
                  to="/signup"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    marginLeft: "2rem",
                  }}
                >
                  <Typography
                    className="menu"
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    Create User
                  </Typography>
                </Link>
                <Link
                  to="/EmployeeDetails"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography
                    style={{ textDecoration: "none", marginLeft: "2rem" }}
                    variant="h6"
                    noWrap
                    className="menu"
                    onClick={handleClick}
                    sx={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    Empolyee Detail
                  </Typography>
                </Link>
              </>
            ) : (
              ""
            )}
          </div>
          {!isLoggedIn && (
            <Button
              color="inherit"
              onClick={handleLogout}
              style={{
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "larger",
                border: "4px solid white",
                borderRadius:'2rem'
              }}
            >
              Logout
              <IconButton>
                <LogoutIcon />
              </IconButton>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default UserNavbar;
