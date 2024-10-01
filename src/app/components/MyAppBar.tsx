import AppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import { useThemeContext } from "@/store/theme-provider";
import { useTheme } from "@mui/material";

export default function MyAppBar() {
  const { toggleTheme } = useThemeContext();
  const theme = useTheme();

  return (
    <AppBar position="static">
      <Toolbar>
        <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
          <Typography variant="h6">Sanqui</Typography>
          <IconButton onClick={toggleTheme}>
            {theme.palette.mode === "dark" ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Link href="/" underline="hover" color="inherit">
            Home
          </Link>
          <Link href="/strategies" underline="hover" color="inherit">
            Strategies
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
