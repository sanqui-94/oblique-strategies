"use client";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect } from "react";
import { useDisplayContext } from "@/store/DisplayContextProvider";

export default function Display() {
  const {
    strategy,
    loadingE,
    mongoError,
    getAnotherStrategy
  } = useDisplayContext();

  useEffect(() => {
    getAnotherStrategy();
  }, []);

  if (loadingE)
    return (
      <Typography
        variant="h5"
        sx={{ textTransform: "uppercase", color: grey[100] }}
      >
        Oblique Strategies
      </Typography>
    );

  if (mongoError)
    return (
      <Typography
        variant="h5"
        sx={{ textTransform: "uppercase", color: grey[100] }}
      >
        Error: There was an unexpected error
      </Typography>
    );

  if (strategy) {
    return (
      <Typography variant="h5" sx={{ color: grey[100] }}>
        {strategy.dilema}
      </Typography>
    );
  }
}
