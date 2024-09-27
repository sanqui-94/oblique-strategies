"use client";
import { Box, Typography } from "@mui/material";
import Display from "./components/Display";
import { grey } from "@mui/material/colors";
import { DisplayContextProvider } from "@/store/DisplayContextProvider";
import { DisplayWrapper } from "./components/DisplayWrapper";

export default function Strategies() {
  return (
    <DisplayContextProvider>
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
        <DisplayWrapper>
          <Display />
        </DisplayWrapper>
      </Box>
    </DisplayContextProvider>
  );
}
