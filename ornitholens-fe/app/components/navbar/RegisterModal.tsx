import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import isEmailValid from "@/app/utils/IsEmailValid";
import { registerHandler } from "@/app/service/AxiosAuthService";

const style = {
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
  //   const [isPasswordError, setPasswordError] = React.useState(true);

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
      registerHandler({ username, email, password });
    } else {
      // Optionally, you can display an error message or handle invalid form data
      console.log("Invalid form data");
    }
  };

  //   const validatePassword = (password: string): void => {
  //     // Regular expression for validating password
  //     const regex =
  //       /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,16}$/;
  //     const isValid = regex.test(password);
  //     isValid ? setPasswordError(false) : setPasswordError(true);
  //   };

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
          label="Username"
          value={username}
          onChange={handleUsernameChange}
        />
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
          //   error={isPasswordError}
          //   helperText="Helper text"
        />
        <Button color="inherit" onClick={handleSubmit}>
          Register
        </Button>
      </Box>
    </Modal>
  );
}
