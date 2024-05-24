"use client";

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import CustomSnackBar from "../CustomSnackBar";
import { useAuth } from "@/app/context/AuthContext";

export default function PasswordChangeBox() {
  const { token } = useAuth();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordTwo, setNewPasswordTwo] = useState<string>("");
  const [isPasswordConfirmationError, setIsPasswordConfirmationError] =
    useState<boolean>(false);
  const [isPasswordChangeError, setIsPasswordChangeError] = useState(false);
  const [isPasswordChangeSuccess, setIsPasswordChangeSuccess] = useState(false);

  async function handleSubmit() {
    const response = await fetch("http://localhost:8080/changePassword", {
      method: "POST",
      body: JSON.stringify({ oldPassword, newPassword }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setIsPasswordChangeSuccess(true);
    } else {
      setIsPasswordChangeError(true);
    }
  }

  const handlePasswordChangeErrorAlertClose = () => {
    setIsPasswordChangeError(false);
  };

  const handlePasswordChangeSuccessAlertClose = () => {
    setIsPasswordChangeSuccess(false);
  };

  const handleOldPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newValue = event.target.value;
    setNewPassword(newValue);
    setIsPasswordConfirmationError(newValue !== newPasswordTwo);
  };

  const handleNewPasswordTwoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newValue = event.target.value;
    setNewPasswordTwo(newValue);
    setIsPasswordConfirmationError(newValue !== newPassword);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          rowGap: "20px",
        }}
      >
        <TextField
          id="standard-password-input"
          label="Old Password"
          type="password"
          variant="standard"
          value={oldPassword}
          onChange={handleOldPasswordChange}
        />
        <TextField
          id="standard-password-input"
          label="New Password"
          type="password"
          variant="standard"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <TextField
          id="standard-password-input"
          label="Confirm New Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          value={newPasswordTwo}
          onChange={handleNewPasswordTwoChange}
          error={isPasswordConfirmationError}
          helperText={
            isPasswordConfirmationError ? "New passwords do not match!" : ""
          }
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Save
        </Button>
      </div>
      <CustomSnackBar
        open={isPasswordChangeError}
        message={"Couldn't change the password. Please try again!"}
        autoHideDuration={3000}
        handleClose={handlePasswordChangeErrorAlertClose}
        severity={"error"}
      />
      <CustomSnackBar
        open={isPasswordChangeSuccess}
        message={"Password changed successfully!"}
        autoHideDuration={3000}
        handleClose={handlePasswordChangeSuccessAlertClose}
        severity={"success"}
      />
    </>
  );
}
