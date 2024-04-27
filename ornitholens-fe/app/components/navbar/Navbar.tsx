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

  console.log("Context log in state:" + isContextLoggedIn); // TODO delete
  console.log("Navbar rendered"); // TODO delete

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/" passHref>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                OrnithoLens
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Link href="/community" passHref>
              <Button color="inherit">Community</Button>
            </Link>
            {isContextLoggedIn ? (
              <>
                <Link href="/identify" passHref>
                  <Button color="inherit">Identify</Button>
                </Link>
                <Link href="/Play" passHref>
                  <Button color="inherit">Play</Button>
                </Link>
                <Button color="inherit" onClick={contextLogout}>
                  Logout
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
                <Button
                  color="inherit"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
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
