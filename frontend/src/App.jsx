import * as React from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import AppBar from "./components/AppBar.jsx";

export const context = React.createContext();

export default function App() {
  // 登入使用者
  const [userData, setUserData] = React.useState({});
  React.useEffect(() => {
    axios.get("/api/user").then((res) => {
      setUserData(res.data);
    });
  }, []);

  return (
    <>
      <context.Provider
        value={{
          userData: userData,
        }}
      >
        <CssBaseline />
        <AppBar />
        <Outlet />
      </context.Provider>
    </>
  );
}
