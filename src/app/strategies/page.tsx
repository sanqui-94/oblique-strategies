import { Box, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Display from "./components/Display";
import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid2";
import clientPromise from "../../../lib/mongodb";

export default async function Strategies() {
  console.log("fren!");
  const client = await clientPromise;
  const db = client.db('oblique_strategies'); // Replace with your database name
  const collection = db.collection('strategies'); // Replace with your collection name

  const data = await collection.find({ "starred": false}).toArray();
  
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
      <Grid container spacing={2} minHeight={200}>
        <Grid size="grow" display="flex" justifyContent="center" alignItems="center">
          <ChevronLeftIcon />
        </Grid>
        <Grid size={8} display="flex" justifyContent="center" alignItems="center">
          <Display />
        </Grid>
        <Grid size="grow" display="flex" justifyContent="center" alignItems="center">
          <ChevronRightIcon />
        </Grid>
      </Grid>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Box>
  );
}
