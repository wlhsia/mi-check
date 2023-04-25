import * as React from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function ListItems() {
  return (
    <React.Fragment>
      <Link to={`/`}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="PN-20230112-R001" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
}
