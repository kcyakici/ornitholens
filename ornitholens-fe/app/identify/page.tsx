import { Divider, Typography } from "@mui/material";
import UploadButtonsAndImage from "../components/bird-identification/UploadButtonsAndImage";
import ParentBoxForIdentificationAndResult from "../components/bird-identification/ParentBoxForIdentificationAndResult";

export default function IdentifyPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "100px" }}>
        <Typography variant="h4" gutterBottom className="text-complementary">
          Welcome to Identify Page
        </Typography>
        <Typography variant="body1" gutterBottom>
          You can upload an image of a bird in order to identify it! The
          uploaded image will be saved into your personal album. You can check
          your album in order to find your history of identified birds!
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          className="text-triadic-primary"
        >
          Make sure that uploaded images are in JPEG format!
        </Typography>
        <Divider variant="middle" />
      </div>
      <ParentBoxForIdentificationAndResult />
    </div>
  );
}
