import * as React from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import AppBar from "./components/AppBar.jsx";

export const Context = React.createContext();

export default function App() {
  const navigate = useNavigate();

  const [userData, setUserData] = React.useState({})
  React.useEffect(() => {
    fetchUserData()
  }, []);

  const fetchUserData = () => {
    axios.get("/api/user").then((res) => {
      setUserData(res.data);
    }).catch(() => {
      navigate("/login");
    });
  }

  return (
    <Context.Provider value={{ userData, fetchUserData }}>
      <CssBaseline />
      <AppBar />
      <Outlet />
    </Context.Provider>
  );
}
