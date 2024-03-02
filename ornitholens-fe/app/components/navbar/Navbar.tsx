"use client";
import React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook
import { testAuthentication } from "@/app/service/AxiosAuthService";

export default function Navbar() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = React.useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const { isContextLoggedIn, contextLogout, token } = useAuth(); // Access the authentication context

  const handleRegisterModalOpen = () => {
    setIsRegisterModalOpen(true);
  };

  const handleRegisterModalClose = () => {
    setIsRegisterModalOpen(false);
  };

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isContextLoggedIn ? (
            <>
              <Button color="inherit" onClick={contextLogout}>
                Logout
              </Button>
              <Button color="inherit" onClick={() => testAuthentication(token)}>
                Hello Check
                {/* TODO: Remove */}
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleRegisterModalOpen}>
                Register
              </Button>
              <Button color="inherit" onClick={handleLoginModalOpen}>
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <RegisterModal
        open={isRegisterModalOpen}
        handleClose={handleRegisterModalClose}
      />
      <LoginModal open={isLoginModalOpen} handleClose={handleLoginModalClose} />
    </Box>
  );
}
