import * as React from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import AppBar from "./components/AppBar.jsx";

export const context = React.createContext();

export default function App() {
  const navigate = useNavigate();
  // 登入使用者
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => {
        setUserData(res.data);
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  return (
    <>
      <context.Provider value={userData}>
        <CssBaseline />
        <AppBar />
        <Outlet />
      </context.Provider>
    </>
  );
}
