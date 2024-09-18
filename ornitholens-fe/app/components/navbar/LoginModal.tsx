import isEmailValid from "@/app/utils/IsEmailValid";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { loginHandler } from "@/app/service/AxiosAuthService";
import { useAuth } from "@/app/context/AuthContext";
import CustomSnackBar from "../CustomSnackBar";

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "#f7fafc", // Light gray background
  borderRadius: 8, // Rounded corners
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
  p: 4,
};

export type LoginModalProps = {
  open: boolean;
  handleClose(): void;
};

export default function LoginModal({
  open,
  handleClose,
}: LoginModalProps): JSX.Element {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isEmailError, setEmailError] = React.useState(true);
  const [isLoginError, setIsLoginError] = React.useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = React.useState(false);
  const { contextLogin } = useAuth();

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  const handleLoginErrorAlertClose = () => {
    setIsLoginError(false);
  };

  const handleLoginSuccessAlertClose = () => {
    setIsLoginSuccess(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    isEmailValid(value) ? setEmailError(false) : setEmailError(true);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      loginHandler(
        email,
        password,
        contextLogin,
        () => {
          setIsLoginSuccess(true);
          resetFields();
          handleClose();
        },
        () => setIsLoginError(true)
      );
      console.log("Login successful");
    } catch (error: any) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 style={{ fontSize: "1.8em", marginBottom: 16 }}>Login!</h1>
          <TextField
            required
            fullWidth
            margin="normal"
            id="outlined-required"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            error={isEmailError}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Login
          </Button>
        </Box>
      </Modal>
      <CustomSnackBar
        open={isLoginError}
        message={"Couldn't login. Please try again!"}
        autoHideDuration={3000}
        handleClose={handleLoginErrorAlertClose}
        severity={"error"}
      />
      <CustomSnackBar
        open={isLoginSuccess}
        message={"Login successful!"}
        autoHideDuration={3000}
        handleClose={handleLoginSuccessAlertClose}
        severity={"success"}
      />
    </>
  );
}
