import { Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Display() {
  return (
    <Paper
      elevation={3}
      sx={{
        height: "30vh",
        width: "40vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        backgroundColor: grey[900]
      }}
    >
      <Typography
        variant="h5"
        sx={{ textTransform: "uppercase", color: grey[100] }}
      >
        Oblique Strategies
      </Typography>
    </Paper>
  );
}
