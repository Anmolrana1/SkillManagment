import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { Link } from "react-router-dom";
// import { useAuth } from "../AuthContext";

import LogoutIcon from "@mui/icons-material/Logout";
import {  IconButton } from "@mui/material";
import FitbitIcon from "@mui/icons-material/Fitbit";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SkillsIcon from "@mui/icons-material/EmojiObjects";
import ProjectIcon from "@mui/icons-material/Work";
import ApprovalIcon from "@mui/icons-material/ThumbUp";
import CreateUserIcon from "@mui/icons-material/PersonAdd";
import EmployeeDetailIcon from "@mui/icons-material/People";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

function UserSidebar() {
  const { logout } = useAuth();
  const [Role, setRole] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [active, setActive] = useState("");
  const location = useLocation();

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    const menuItem = pathname.substring(1); // Remove the leading '/'
    setActive(menuItem);
  }, [location]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <>
      <Sidebar
        collapsed={!isOpen}
        style={{
          width: "5%",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Menu
          style={{
            backgroundColor: "rgb(50, 50, 150)",
            paddingTop: "0",
            marginTop: "0",
            minHeight: "100vh",
            height: "100%",
            textAlign: "left",
            width: "100%",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <div
            style={{
              paddingTop: "2rem",
              paddingLeft: "0.7rem",
              borderBottom: "2px solid white",
              paddingBottom: "2rem",
              display: "flex",
              alignItems: "center",
            }}
          >
             <FitbitIcon
               sx={{
                 display: { xs: "none", md: "flex" },
                 fontSize: "4rem",                 color: "white",
               }}
              onClick={toggleSidebar}
             />
             <h2 style={{ color: "white", marginLeft: "0.2rem" }}>SkillMatrix</h2>
       </div>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Link to="/userdashboard" style={{}}>
              <MenuItem
                style={{
                  color: active === "userdashboard" ? "black" : "white",
                  paddingLeft: "1rem",
                  fontSize: "large",
                  display: "flex",
                  alignItems: "center",
                }}
              >  <ProfileIcon sx={{ color: "white", marginRight: "1rem" }} />
                User Dashboard
                
              </MenuItem>
            </Link>
            <Link to="/Certificates">
              <MenuItem
                style={{
                  color: active === "Certificates" ? "black" : "white",
                  paddingLeft: "1rem",
                  fontSize: "large",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CheckCircleIcon sx={{ color: "white", marginRight: "1rem" }} />
                Certificates
              </MenuItem>
            </Link>
            <Link to="/Skills">
              <MenuItem
                style={{
                  color: active === "Skills" ? "black" : "white",
                  paddingLeft: "1rem",
                  fontSize: "large",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SkillsIcon sx={{ color: "white", marginRight: "1rem" }} />
                Skills
              </MenuItem>
            </Link>
            <Link to="/ProjectExperence">
              <MenuItem
                style={{
                  color: active === "ProjectExperence" ? "black" : "white",
                  paddingLeft: "1rem",
                  fontSize: "large",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ProjectIcon sx={{ color: "white", marginRight: "1rem" }} />
                Project Experience
              </MenuItem>
            </Link>
            {Role === "Approver" && (
              <>
                <Link to="/CertificateForApp">
                  <MenuItem
                    style={{
                      color: active === "CertificateForApp" ? "black" : "white",
                      paddingLeft: "1rem",
                      fontSize: "large",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ApprovalIcon sx={{ color: "white", marginRight: "1rem" }} />
                    Certificates For Approval
                  </MenuItem>
                </Link>
                <Link to="/ProjectForApproval">
                  <MenuItem
                    style={{
                      color: active === "ProjectForApproval" ? "black" : "white",
                      paddingLeft: "1rem",
                      fontSize: "large",
                      display: "flex",
                      alignItems: "center",
                    }}
                  ><ApprovalIcon sx={{ color: "white", marginRight: "1rem" }} />
                    Projects For Approval
                  </MenuItem>
                </Link>
                <Link to="/AddSkill">
                  <MenuItem
                    style={{
                      color: active === "AddSkill" ? "black" : "white",
                      paddingLeft: "1rem",
                      fontSize: "large",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <SkillsIcon sx={{ color: "white", marginRight: "1rem" }} />
                    Add New Skill
                  </MenuItem>
                </Link>
              </>
            )}
            {Role === "Admin" && (
              <>
                <Link to="/signup">
                  <MenuItem
                    style={{
                      color: active === "signup" ? "black" : "white",
                      paddingLeft: "1rem",
                      fontSize: "large",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                     <CreateUserIcon sx={{ color: "white", marginRight: "1rem" }} />
                    Create User
                  </MenuItem>
                </Link>
                <Link to="/EmployeeDetails">
                  <MenuItem
                    style={{
                      color: active === "EmployeeDetails" ? "black" : "white",
                      paddingLeft: "1rem",
                      fontSize: "large",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <EmployeeDetailIcon sx={{ color: "white", marginRight: "1rem" }} />
                    Employee Detail
                  </MenuItem>
                </Link>
              </>
            )}
            <MenuItem
              style={{
               
                color: "white",
                paddingLeft: "1rem",
                fontSize: "large",
                display: "flex",
                alignItems: "center",
                marginTop:"2rem",
              }}
              onMouseEnter={(e) => e.target.style.color = "black"}
              onMouseLeave={(e) => e.target.style.color = "white"}
            >
              <button
                onClick={handleLogout}
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: "larger",
                  color: "white",
                  paddingRight:"2.5rem",
                  
                  width: "100%",
                  textTransform: "none",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <IconButton style={{ color: "white", fontWeight: "bold",fontSize:'xxx-large' }}>
                   <LogoutIcon />
                 </IconButton>
                Logout
              </button>
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </>
  );
}

export default UserSidebar;

