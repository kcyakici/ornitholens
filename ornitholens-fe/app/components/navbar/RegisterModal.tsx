import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import isEmailValid from "@/app/utils/IsEmailValid";
import { registerHandler } from "@/app/service/AxiosAuthService";
import CustomSnackBar from "../CustomSnackBar";

const style = {
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

type RegisterModalProps = {
  open: boolean;
  handleClose(): void;
};

export default function RegisterModal({
  open,
  handleClose,
}: RegisterModalProps): JSX.Element {
  const [username, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isEmailError, setEmailError] = React.useState(true);
  const [isRegisterError, setIsRegisterError] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setUserName("");
  };

  const handleRegisterErrorAlertClose = () => {
    setIsRegisterError(false);
  };

  const handleRegisterSuccessAlertClose = () => {
    setIsRegisterSuccess(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    isEmailValid(value) ? setEmailError(false) : setEmailError(true);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSubmit = () => {
    if (!isEmailError) {
      registerHandler(
        { username, email, password },
        () => {
          setIsRegisterSuccess(true);
          resetFields();
          handleClose();
        },
        () => setIsRegisterError(true)
      );
    } else {
      console.log("Invalid form data");
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
          <h1 style={{ fontSize: "1.8em", marginBottom: 16 }}>
            Join OrnithoLens Today
          </h1>
          <TextField
            required
            fullWidth
            margin="normal"
            id="outlined-required"
            label="Username"
            value={username}
            onChange={handleUsernameChange}
          />
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
            Register
          </Button>
        </Box>
      </Modal>
      <CustomSnackBar
        open={isRegisterError}
        message={"Could not register! Try again!"}
        autoHideDuration={3000}
        handleClose={handleRegisterErrorAlertClose}
        severity={"error"}
      />
      <CustomSnackBar
        open={isRegisterSuccess}
        message={"Register Successful"}
        autoHideDuration={3000}
        handleClose={handleRegisterSuccessAlertClose}
        severity={"success"}
      />
    </>
  );
}
