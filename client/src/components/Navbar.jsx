import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FLexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import { logout } from "slice/user";
import profileImage from "assets/user.jpg";
import axios from "axios";
import {
  AppBar,
  useTheme,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout()); // Gọi Redux logout
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        console.log("User logged out");
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Error during logout", error);
      });
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Leftside */}
        <FLexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FLexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FLexBetween>
        </FLexBetween>

        {/* Rightside */}
        <FLexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined />
          </IconButton>
          <FLexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                textTransform: "none",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontSize="0.85rem"
                  fontWeight="bold"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </FLexBetween>
        </FLexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
