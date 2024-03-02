import isEmailValid from "@/app/utils/IsEmailValid";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { loginHandler } from "@/app/service/AxiosAuthService";
import { useAuth } from "@/app/context/AuthContext";

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export type LoginModalProps = {
  open: boolean;
  handleClose(): void;
};

export default function RegisterModal({
  open,
  handleClose,
}: LoginModalProps): JSX.Element {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isEmailError, setEmailError] = React.useState(true);
  const { contextLogin } = useAuth();

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
      loginHandler(email, password, contextLogin);
      console.log("Login successful");
    } catch (error: any) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 style={{ fontSize: "1.5em" }}>Join OrnithoLens Today</h1>
        <TextField
          required
          sx={{ marginY: "10px" }}
          id="outlined-required"
          label="Email"
          value={email}
          onChange={handleEmailChange}
          error={isEmailError}
        />
        <TextField
          required
          sx={{ marginY: "10px" }}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button color="inherit" onClick={handleSubmit}>
          Login
        </Button>
      </Box>
    </Modal>
  );
}
