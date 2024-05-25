"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { deleteForumPost } from "@/app/service/AxiosAuthService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import CustomSnackBar from "../CustomSnackBar";

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

export default function ForumPostDeleteConfirmationModal({
  id,
  open,
  handleClose,
}: {
  id: string;
  open: boolean;
  handleClose(): void;
}) {
  const { token } = useAuth();
  const router = useRouter();
  const [isMessageDeletionSuccess, setIsMessageDeletionSuccess] =
    useState(false);

  const handleMessageDeletionSuccessAlertClose = () => {
    setIsMessageDeletionSuccess(false);
  };

  const handleConfirm = async () => {
    console.log(`Id of the post: ${id}`);
    const response = await deleteForumPost(id, token);
    if (response && response.status >= 200 && response.status <= 299) {
      setIsMessageDeletionSuccess(true);
      setTimeout(() => {
        router.refresh();
      }, 3000);
    }
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirmation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you confirm deleting this post?
          </Typography>
          <Button onClick={handleConfirm}>Confirm</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
      <CustomSnackBar
        open={isMessageDeletionSuccess}
        message={"Your message is deleted successfully!"}
        autoHideDuration={3000}
        handleClose={handleMessageDeletionSuccessAlertClose}
        severity={"success"}
      />
    </div>
  );
}
