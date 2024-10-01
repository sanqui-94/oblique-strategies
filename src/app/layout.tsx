"use client";
import "./globals.css";
import {
  AppBar,
  Box,
  createTheme,
  CssBaseline,
  Link,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  useColorScheme
} from "@mui/material";

import { ThemeContextProvider } from "@/store/theme-provider";
import MyAppBar from "./components/MyAppBar";

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeContextProvider>
          <CssBaseline />
          <Box sx={{ flexGrow: 1 }}>
            <MyAppBar />
            {children}
          </Box>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
