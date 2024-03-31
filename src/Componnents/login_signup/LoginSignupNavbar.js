
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,

} from "@mui/material";

import "../user/UserNavbar";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";


function LoginSignupNavbar() {
 
  return (
    <AppBar position="static" className="p-2" style={{backgroundColor:"rgb(50, 50, 150)"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Link to='/'  style={{ textDecoration: "none" }}>
            <Typography
              className="menu"
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
                color:"white"
              }}
            >
              LOGO
            </Typography>
            </Link>
            </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default LoginSignupNavbar;
