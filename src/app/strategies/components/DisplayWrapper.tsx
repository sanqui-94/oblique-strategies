import { Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid2";
import DisplayLeftPanel from "./DisplayLeftPanel";
import DisplayRightPanel from "./DisplayRightPanel";

export const DisplayWrapper: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {

  return (
    <Grid container spacing={2} minHeight={200}>
      <Grid
        size="grow"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <DisplayLeftPanel />
      </Grid>
      <Grid size={8} display="flex" justifyContent="center" alignItems="center">
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            backgroundColor: grey[900],
            height: "250px",
            width: "450px"
          }}
        >
          {children}
        </Paper>
      </Grid>
      <Grid
        size="grow"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <DisplayRightPanel />
      </Grid>
    </Grid>
  );
};
