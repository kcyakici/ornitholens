import PasswordChangeBox from "@/app/components/profile/PasswordChangeBox";
import { Typography } from "@mui/material";

export default function ChangePasswordPage() {
  return (
    <div>
      <Typography variant="h5">You can change your password here</Typography>
      <br></br>
      <PasswordChangeBox />
    </div>
  );
}
