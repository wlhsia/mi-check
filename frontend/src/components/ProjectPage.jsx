import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import ProjectListDrawer from "./project/ProjectListDrawer";
import CreateProjectModal from "./project/CreateProjectModal";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function ProjectPage() {
  // Drawe
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Tab
  const [tabValue, setTabValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  //Modal
  const [modalOpen, setModalOpen] = React.useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <ProjectListDrawer
          open={drawerOpen}
          toggleDrawer={toggleDrawer}
          toggleModal={toggleModal}
        ></ProjectListDrawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "90vh",
            overflow: "auto",
          }}
        >
          <Typography></Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="查核案設定" />
              <Tab label="查核項目排訂" />
              <Tab label="查核&改善彙總" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}></TabPanel>
          <TabPanel value={tabValue} index={1}></TabPanel>
        </Box>
      </Box>
      <CreateProjectModal open={modalOpen} toggle={toggleModal} />
    </>
  );
}
