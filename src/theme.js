import { createTheme } from "@mui/material/styles";

const FONT_STACK = [
  "Inter",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  '"PingFang SC"',
  '"Microsoft YaHei"',
  "Roboto",
  "sans-serif",
].join(",");

const theme = createTheme({
  palette: {
    primary: {
      main: "#14b8a6",
      dark: "#0d9488",
      light: "#5eead4",
      contrastText: "#fff",
    },
    secondary: { main: "#0f172a" },
    text: { primary: "#0f172a", secondary: "#475569" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: FONT_STACK,
    button: { textTransform: "none", fontWeight: 600, letterSpacing: 0 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, paddingInline: 20 },
      },
    },
    MuiPaper: {
      styleOverrides: { rounded: { borderRadius: 16 } },
    },
    MuiTab: {
      styleOverrides: { root: { textTransform: "none", fontWeight: 600 } },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined" },
    },
  },
});

export default theme;
