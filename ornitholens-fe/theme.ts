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
      main: "#6884ec",
    },
    secondary: {
      main: "#eccf68",
    },
  },
});

export default theme;

export const secondaryTheme = {
  palette: {
    primary: "#6884ec",
    secondary: "#eccf68",
    analogous: {
      primary: "#68c6ec",
      secondary: "#8d68ec",
    },
    tertiary: {
      primary: "#cf68ec",
      secondary: "#ec6884",
    },
  },
};
