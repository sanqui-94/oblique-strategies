import { Container, Grid2 } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Display from "./components/Display";

export default function Strategies() {
  return (
    <Container maxWidth="sm">
      <Grid2 container>
        <Grid2 size={2}>
          <ChevronLeftIcon />
        </Grid2>
        <Grid2 size={8}>
          <Display />
        </Grid2>
        <Grid2 size={2}>
          <ChevronRightIcon />
        </Grid2>
      </Grid2>
    </Container>
  );
}
