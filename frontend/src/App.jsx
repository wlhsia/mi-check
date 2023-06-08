import * as React from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import AppBar from "./components/AppBar.jsx";

export const Context = React.createContext();

export default function App() {
  const navigate = useNavigate();

  const [userData, setUserData] = React.useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/user");
      setUserData(response.data);
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  return (
    <Context.Provider value={{ userData, fetchUserData }}>
      <CssBaseline />
      <AppBar />
      <Outlet />
    </Context.Provider>
  );
}
