import * as React from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentIcon from "@mui/icons-material/Assignment";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Tooltip from "@mui/material/Tooltip";

const drawerWidth = "20rem";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function ProjectsDrawer(props) {
  const {
    open,
    toggleDrawer,
    toggleModal,
    userData,
    project,
    getProject,
    deleteProject,
  } = props;

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <ListSubheader component="div" inset>
          查核案件
          <Tooltip title="建立查核案件">
            <IconButton onClick={toggleModal}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        </ListSubheader>
        {userData.InspectorProjects.map((p) => {
          if (p.ProjectID === project.ProjectID) {
            return (
                <ListItemButton
                  selected
                  key={p.ProjectID}
                  onClick={() => getProject(p.ProjectID)}
                >
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary={p.ProjectNo} />
                  {/* <Tooltip title="刪除"> */}
                  <IconButton>
                    <DeleteIcon onClick={() => deleteProject(p.ProjectID)} />
                  </IconButton>
                  {/* </Tooltip> */}
                </ListItemButton>
            );
          } else {
            return (
              <ListItemButton
                key={p.ProjectID}
                onClick={() => getProject(p.ProjectID)}
              >
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={p.ProjectNo} />
                <IconButton>
                  <DeleteIcon onClick={() => deleteProject(p.ProjectID)} />
                </IconButton>
              </ListItemButton>
            );
          }
        })}
        <Divider sx={{ my: 1 }} />
        <ListSubheader component="div" inset>
          被查核案件
        </ListSubheader>
      </List>
    </Drawer>
  );
}
