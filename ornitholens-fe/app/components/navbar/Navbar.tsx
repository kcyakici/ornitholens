"use client";
import React from "react";
import Link from "next/link";
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
  const { isContextLoggedIn, contextLogout, token } = useAuth();

  console.log("Context log in state:" + isContextLoggedIn);
  console.log("Navbar rendered");

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
            OrnithoLens
          </Typography>
          {isContextLoggedIn ? (
            <>
              <Button color="inherit" onClick={contextLogout}>
                Logout
              </Button>
              <Link href="/community">
                <Button color="inherit">Community</Button>
              </Link>
              <Button color="inherit" onClick={() => testAuthentication(token)}>
                Hello Check
                {/* TODO: Remove */}
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => setIsRegisterModalOpen(true)}
              >
                Register
              </Button>
              <Button color="inherit" onClick={() => setIsLoginModalOpen(true)}>
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <RegisterModal
        open={isRegisterModalOpen}
        handleClose={() => setIsRegisterModalOpen(false)}
      />
      <LoginModal
        open={isLoginModalOpen}
        handleClose={() => setIsLoginModalOpen(false)}
      />
    </Box>
  );
}
