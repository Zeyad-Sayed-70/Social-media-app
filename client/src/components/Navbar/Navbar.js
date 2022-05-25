import { useState } from "react";
import { Avatar, Button } from "@mui/material";
import { Col } from "react-bootstrap";
import NavbarStyled from "./NavbarStyled.styled";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function PrimarySearchAppBar() {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  return (
    <NavbarStyled>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar
            className="text-light"
            style={{ backgroundColor: "#212529 " }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <a
                href="/"
                className="text-light ms-auto"
                style={{ textDecoration: "none" }}
              >
                MEMORISE
              </a>
            </Typography>
            {/* Profile info */}
            {profile && (
              <Col className="profile-info ms-auto me-3 me-md-5 d-flex align-items-center col-6 col-md-2">
                <div>
                  <Avatar
                    {...stringAvatar(
                      `${profile?.firstName} ${profile?.lastName}`
                    )}
                    alt={profile?.firstName}
                    src={profile?.firstName}
                    sx={{ width: "36px", height: "36px", fontSize: "16px" }}
                  />
                </div>
                <h5 className="m-0 ms-3">{`${profile?.firstName} ${profile?.lastName}`}</h5>
              </Col>
            )}
            {/* sign in & logout buttons */}
            {JSON.parse(localStorage.getItem("profile")) ? (
              <Button
                variant="contained"
                color="error"
                className=""
                onClick={() => {
                  localStorage.removeItem("profile");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            ) : (
              <a
                href="/SignIn"
                className="text-light ms-auto"
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained">Sign In</Button>
              </a>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </NavbarStyled>
  );
}
