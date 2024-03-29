import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";

export default function ForumPostHoverOptions(): JSX.Element {
  return (
    <Box>
      <EditIcon />
      <DeleteIcon />
    </Box>
  );
}
