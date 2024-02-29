import isEmailValid from "@/app/utils/IsEmailValid";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import loginHandler from "@/app/api/loginHandler";
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
      // Call the loginHandler function to authenticate the user
      await loginHandler(email, password, contextLogin);

      // Optionally, you can perform actions after successful login
      console.log("Login successful");
    } catch (error: any) {
      // Handle any errors that occur during login
      console.error("Error logging in:", error.message);
      // Optionally, display an error message to the user
    }

    // if (!isEmailError) {
    //   const registerEndpoint =
    //     process.env.REGISTER_ENDPOINT ?? "http://localhost:8080/authenticate";
    //   // Here you can perform your HTTP POST request with the email and password using Axios
    //   axios
    //     .post(registerEndpoint, {
    //       email: email,
    //       password: password,
    //     })
    //     .then((response) => {
    //       console.log("Form submitted successfully:", response.data);
    //       // Optionally, you can perform actions after successful form submission
    //     })
    //     .catch((error) => {
    //       console.error("Error submitting form:", error);
    //       // Optionally, you can handle errors from the server
    //     });
    // } else {
    //   // Optionally, you can display an error message or handle invalid form data
    //   console.log("Invalid form data");
    // }
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
