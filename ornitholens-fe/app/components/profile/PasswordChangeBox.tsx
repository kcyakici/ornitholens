"use client";

import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function PasswordChangeBox() {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordTwo, setNewPasswordTwo] = useState<string>("");
  const [isPasswordConfirmationError, setIsPasswordConfirmationError] =
    useState<boolean>(false);

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

  const handleSubmit = () => {};

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
    </>
  );
}
