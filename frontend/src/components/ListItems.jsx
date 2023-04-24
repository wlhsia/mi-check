import * as React from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

export default function ListItems() {
  return (
    <React.Fragment>
      <Link to={`/`}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="首頁" />
        </ListItemButton>
      </Link>
      <Link to={`Basic/`}>
        <ListItemButton>
          <ListItemIcon>
            <FormatListNumberedIcon />
          </ListItemIcon>
          <ListItemText primary="MI查核項目基本資料" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
}
