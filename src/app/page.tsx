import { Box, Typography } from "@mui/material";

export const metadata = {
  title: 'Sanqui App',
  description: 'Personal Portfolio',
};

export default function Home() {
  return (
    <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <Typography variant="h3">Hello world, this is me, Santiago</Typography>
      </Box>
  );
}
