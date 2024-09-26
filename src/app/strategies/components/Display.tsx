"use client";
import { Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

type strategy = {
  dilema: string;
  starred: boolean;
  seen: boolean;
  _id: string;
};

type data = {
  data: strategy[];
};

export default function Display() {
  const [data, setData] = useState<null | data>(null);
  const [loadingE, setLoadingE] = useState<boolean>(true);
  const [mongoError, setMongoError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/prototype"); // API route we created
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setMongoError(err.message);
      } finally {
        setLoadingE(false);
      }
    };

    fetchData();
  }, []);

  async function arrowHandler(id: string) {
    console.log(id);
    try {
      const res = await fetch("/api/prototype", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });

      const result = await res.json();

      if (res.ok) {
        console.log("Update success:", result);
      } else {
        console.error("Error updating:", result.error);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }

    // get a new dilema
    try {
      const res = await fetch("/api/prototype");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Error while fetching:", error);
    }
  }

  async function starHanlder(id:string) {
    try {
      const res = await fetch("/api/prototype", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, fav: true })
      });

      const result = await res.json();

      if (res.ok) {
        console.log("Update success:", result);
      } else {
        console.error("Error updating:", result.error);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  }

  if (loadingE)
    return (
      <Grid container spacing={2} minHeight={200}>
        <Grid
          size="grow"
          display="flex"
          justifyContent="center"
          alignItems="center"
        ></Grid>
        <Grid
          size={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
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
            <Typography
              variant="h5"
              sx={{ textTransform: "uppercase", color: grey[100] }}
            >
              Oblique Strategies
            </Typography>
          </Paper>
        </Grid>
        <Grid
          size="grow"
          display="flex"
          justifyContent="center"
          alignItems="center"
        ></Grid>
      </Grid>
    );

  if (mongoError) return <div>Error: {mongoError}</div>;

  if (data) {
    console.log(data);
    return (
      <Grid container spacing={2} minHeight={200}>
        <Grid
          size="grow"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <ChevronLeftIcon onClick={() => arrowHandler(data.data[0]._id)} />
        </Grid>
        <Grid
          size={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
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
            <Typography variant="h5" sx={{ color: grey[100] }}>
              {data.data[0].dilema}
            </Typography>
          </Paper>
        </Grid>
        <Grid
          size="grow"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {data.data[0].starred ? (<StarIcon />) : (<StarBorderIcon onClick={() => starHanlder(data.data[0]._id)} />)}
        </Grid>
      </Grid>
    );
  }
}
