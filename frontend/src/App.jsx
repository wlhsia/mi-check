import { Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import AppBar from "./components/AppBar.jsx";

export default function App() {
  return (
    <>
      <CssBaseline />
      <AppBar />
      <Outlet />
    </>
  );
}
