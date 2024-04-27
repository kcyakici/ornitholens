"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#a82be2",
    },
    secondary: {
      main: "#65e22b",
    },
  },
});

export default theme;

export const secondaryTheme = {
  palette: {
    primary: "#a82be2",
    complementary: "#65e22b",
    analogous: {
      primary: "#4d2be2",
      secondary: "#e22bc0",
    },
    triadic: {
      primary: "#e22b65",
      secondary: "#e2a82b",
    },
  },
};
