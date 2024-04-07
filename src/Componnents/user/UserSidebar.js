import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

import LogoutIcon from "@mui/icons-material/Logout";
import { Button, IconButton, ListItemIcon } from "@mui/material";
import FitbitIcon from "@mui/icons-material/Fitbit";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SkillsIcon from "@mui/icons-material/EmojiObjects";
import ProjectIcon from "@mui/icons-material/Work";
import ApprovalIcon from "@mui/icons-material/ThumbUp";
import CreateUserIcon from "@mui/icons-material/PersonAdd";
import EmployeeDetailIcon from "@mui/icons-material/People";

function UserSidebar() {
  const { isLoggedIn, logout } = useAuth();
  const [Role, setRole] = useState("");

  const [isOpen, setIsOpen] = useState(true);


  useEffect(() => {
    setRole(localStorage.getItem("role"))
  },[]);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar collapsed={!isOpen} style={{ width: "5%", boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", }}>
        <Menu
          style={{
            backgroundColor: "rgb(50, 50, 150)",
            paddingTop: "0",
            marginTop: "0",minHeight:"100vh",
            height: "100%",
            textAlign: "left",
            width: "100%", boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <div
            style={{ paddingTop: "2rem", paddingLeft: "0.7rem" ,borderBottom:"2px solid white", paddingBottom: "2rem",display:'flex',alignItems:'center'}}
          >

            <FitbitIcon
              sx={{
                display: { xs: "none", md: "flex" },
                fontSize: "4rem",
                color: "white",
              }}
              onClick={toggleSidebar}
            />
            <h2 style={{color:'white',marginLeft:'0.2rem'}}>SkillMatrix</h2>
          </div>

          <div
            style={{
              marginTop: "2rem",display:"flex",flexDirection:'column',justifyContent:'space-between'
            }}
          >
            <Link to="/userdashboard" style={{}}>
              <MenuItem
                style={{
                  color: "black",
                  paddingLeft: "1rem",
                  fontWeight: "bold",
                  fontSize: "large",
                  display:'flex',
                }}
              >
                <ListItemIcon>
                  <ProfileIcon />
                </ListItemIcon>
                Profile
              </MenuItem>
            </Link>
            <Link to="/Certificates">
  <MenuItem
    style={{
      color: "black",
      paddingLeft: "1rem",
      fontWeight: "bold",
      fontSize: "large",
    }}
  >
    <ListItemIcon>
      <CheckCircleIcon />
    </ListItemIcon>
    Certificates
  </MenuItem>
</Link>
            <Link to="/Skills">
              <MenuItem
                style={{
                  color: "black",
                  paddingLeft: "1rem",
                  fontWeight: "bold",
                  fontSize: "large",
                }}
              >
                <ListItemIcon>
                  <SkillsIcon />
                </ListItemIcon>
                Skills
              </MenuItem>
            </Link>
            <Link to="/ProjectExperence">
              <MenuItem
                style={{
                  color: "black",
                  paddingLeft: "1rem",
                  fontWeight: "bold",
                  fontSize: "large",
                }}
              >
                <ListItemIcon>
                  <ProjectIcon />
                </ListItemIcon>
                Project Experience
              </MenuItem>
            </Link>

            {Role === "Approver" && (
              <>
                <Link to="/CertificateForApp">
                  <MenuItem
                    style={{
                      color: "black",
                      paddingLeft: "1rem",
                      fontWeight: "bold",
                      fontSize: "large",
                    }}
                  >
                    <ListItemIcon>
                      <ApprovalIcon />
                    </ListItemIcon>
                    Certificates For Approval
                  </MenuItem>
                </Link>
                <Link to="/ProjectForApproval">
                  <MenuItem
                    style={{
                      color: "black",
                      paddingLeft: "1rem",
                      fontWeight: "bold",
                      fontSize: "large",
                    }}
                  >
                    <ListItemIcon>
                      <ApprovalIcon />
                    </ListItemIcon>
                    Projects For Approval
                  </MenuItem>
                </Link>
                <Link to="/AddSkill">
                  <MenuItem
                    style={{
                      color: "black",
                      paddingLeft: "1rem",
                      fontWeight: "bold",
                      fontSize: "large",
                    }}
                  >
                    <ListItemIcon>
                      <SkillsIcon />
                    </ListItemIcon>
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
                      color: "black",
                      paddingLeft: "1rem",
                      fontWeight: "bold",
                      fontSize: "large",
                    }}
                  >
                    <ListItemIcon>
                      <CreateUserIcon />
                    </ListItemIcon>
                    Create User
                  </MenuItem>
                </Link>
                <Link to="/EmployeeDetails">
                  <MenuItem
                    style={{
                      color: "black",
                      paddingLeft: "1rem",
                      fontWeight: "bold",
                      fontSize: "large",
                    }}
                  >
                    <ListItemIcon>
                      <EmployeeDetailIcon />
                    </ListItemIcon>
                    Employee Detail
                  </MenuItem>
                </Link>
              </>
            )}

              <MenuItem style={{marginTop:'2rem',}}>
                <Button
                 
                  onClick={handleLogout}
                  style={{
                  
                    fontFamily: "monospace",
                    fontWeight: 700,
                    fontSize: "larger",
                   
                    color:'black',
                    padding: "5px",
                    width: "100%",
                  }}
                > 
                <IconButton style={{ color: "black" ,fontWeight:"bolder"}}>
                    <LogoutIcon />
                  </IconButton>
                  Logout
                 
                </Button>
              </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </>
  );
}

export default UserSidebar;
