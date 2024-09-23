import { Box, Typography } from "@mui/material";
import Display from "./components/Display";
import { grey } from "@mui/material/colors";

export default  function Strategies() {
  return (
    <Box
      sx={{
        backgroundColor: grey[200],
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "25vh"
      }}
    >
      <Display />
    </Box>
  );
}
