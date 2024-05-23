"use client";
import React from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook
import { testAuthentication } from "@/app/service/AxiosAuthService";
import CustomAccountCircle from "./CustomAccountCircle";

export default function Navbar() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = React.useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { isContextLoggedIn, contextLogout, token } = useAuth();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log("Context log in state:" + isContextLoggedIn); // TODO delete
  console.log("Navbar rendered"); // TODO delete

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link href="/" passHref>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                OrnithoLens
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
            }}
          >
            <Link href="/community" passHref>
              <Button color="inherit">Community</Button>
            </Link>
            {isContextLoggedIn ? (
              <>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ background: "white" }}
                />
                <Link href="/identify" passHref>
                  <Button color="inherit">Identify</Button>
                </Link>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ background: "white" }}
                />
                <Link href="/play" passHref>
                  <Button color="inherit">Play</Button>
                </Link>
                <CustomAccountCircle
                  anchorEl={anchorEl}
                  handleClose={handleClose}
                  handleMenu={handleMenu}
                  contextLogout={contextLogout}
                />
              </>
            ) : (
              <>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ background: "white" }}
                />
                <Button
                  color="inherit"
                  onClick={() => setIsRegisterModalOpen(true)}
                >
                  Register
                </Button>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ background: "white" }}
                />
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
