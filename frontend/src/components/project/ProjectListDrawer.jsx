import * as React from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";

import CreateProjectModal from "./CreateProjectModal";

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
  const { open, toggleDrawer } = props;
  const [user, setUser] = React.useState({
    Projects: [],
  });

  const fetchUserData = () => {
    axios.get("/api/user").then((res) => {
      setUser(res.data);
    });
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  // Modal
  const [modalOpen, setModalOpen] = React.useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          {open ? (
            <Button variant="contained" onClick={toggleModal}>
              建立查核案
            </Button>
          ) : null}
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {user.Projects.map((project) => {
            return (
              <ListItemButton key={project.ProjectID}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={project.ProjectNo} />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
      <CreateProjectModal
        open={modalOpen}
        toggle={toggleModal}
        fetchUserData={fetchUserData}
      />
    </>
  );
}
