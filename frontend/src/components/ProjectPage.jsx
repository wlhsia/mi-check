import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Context } from "../App";
import Drawer from "./project/ListDrawer";
import ProjectCreateModal from "./project/BasicModal";
import Basic from "./project/Basic";
import ProjectItemList from "./project_item/ScheduleList";
import ProjectItemAddModal from "./project_item/AddModal";
import ProjectItemCheckList from "./project_item/CheckList";
import ProjectItemDetailModal from "./project_item/DetailModal";

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
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

export default function ProjectPage() {
  // Data
  const { userData, fetchUserData } = React.useContext(Context);
  const [project, setProject] = React.useState({
    ProjectID: null,
  });
  const [items, setItems] = React.useState([]);
  const [projectItemsTemp, setProjectItemsTemp] = React.useState([]);
  const [projectItems, setProjectItems] = React.useState([]);
  const [projectItem, setProjectItem] = React.useState(null);

  // Fetch API
  const postUser = async (notesID) => {
    try {
      const response = await axios.post(`/api/users`, {
        NotesID: notesID,
        IsAdmin: false,
      });
      const UserID = response.data.UserID;
      return UserID;
    } catch (error) {
      console.error(error);
    }
  };
  const postProject = async (payload) => {
    try {
      await axios.post(`/api/projects`, payload);
      fetchUserData();
    } catch (error) {
      console.error(error);
    }
  };
  const deleteProject = async (projectID) => {
    try {
      await axios.delete(`/api/projects/${projectID}`);
      setProject({ ProjectID: null });
      fetchUserData();
    } catch (error) {
      console.error(error);
    }
  };
  const putProject = async (projectID, payload) => {
    try {
      const response = await axios.put(`/api/projects/${projectID}`, payload);
      setProject(response.data);
      fetchUserData();
    } catch (error) {
      console.error(error);
    }
  };
  const getProject = async (projectID) => {
    try {
      const response = await axios.get(`/api/projects/${projectID}`);
      setProject(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getItems = async (itemType) => {
    try {
      const response = await axios.get(`/api/items?itemType=${itemType}`);
      const items = response.data.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      setItems(items);
    } catch (error) {
      console.error(error);
    }
  };
  const getProjectItems = async (projectID) => {
    try {
      const response = await axios.get(
        `/api/project_items?projectID=${projectID}`
      );
      const projectItems = response.data.map((item, index) => ({
        ...item,
        ...item.ItemDetail,
        id: index + 1,
      }));
      console.log(projectItems)
      setProjectItems(projectItems);
    } catch (error) {
      console.error(error);
    }
  };
  const postProjectItems = async (projectItems) => {
    try {
      const response = await axios.post(`/api/project_items`, projectItems);
      // setProjectItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getProjectItem = async (projectItemID) => {
    try {
      const response = await axios.get(
        `/api/project_items/${projectItemID}`
      );
      setProjectItem(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const putProjectItem = async (projectItemID, payload) => {
    try {
      await axios.put(`/api/project_items/${projectItemID}`, payload);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteProjectItem = async (projectItemID) => {
    try {
      await axios.delete(`/api/project_items/${projectItemID}`);
    } catch (error) {
      console.error(error);
    }
  };
  const putProjectItemPhoto = async (projectItemID, photoType, formData) => {
    try {
      await axios.put(`/api/photo/${projectItemID}?photoType=${photoType}`, formData);
    } catch (error) {
      console.error(error);
    }
  };

  // ProjectDrawer
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // ProjectCreateModal
  const [projectCreateModalOpen, setProjectCreateModalOpen] =
    React.useState(false);
  const toggleProjectCreateModal = () => {
    setProjectCreateModalOpen(!projectCreateModalOpen);
  };

  // Tab
  const [tabValue, setTabValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // ProjectItemAddModal
  const [projectItemAddModalOpen, setProjectItemAddModalOpen] =
    React.useState(false);
  const toggleProjectItemAddModal = () => {
    setProjectItemAddModalOpen(!projectItemAddModalOpen);
  };

  // ProjectItemDetailModal
  const [projectItemDetailModalOpen, setProjectItemDetailModalOpen] =
    React.useState(false);
  const toggleProjectItemDetailModal = () => {
    setProjectItemDetailModalOpen(!projectItemDetailModalOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Drawer
          open={drawerOpen}
          toggleDrawer={toggleDrawer}
          toggleModal={toggleProjectCreateModal}
          userData={userData}
          project={project}
          getProject={getProject}
          deleteProject={deleteProject}
          getProjectItems={getProjectItems}
        />
        <ProjectCreateModal
          open={projectCreateModalOpen}
          toggle={toggleProjectCreateModal}
          userData={userData}
          postUser={postUser}
          postProject={postProject}
          getProject={getProject}
        />
        <ProjectItemAddModal
          open={projectItemAddModalOpen}
          toggle={toggleProjectItemAddModal}
          items={items}
          setProjectItemsTemp={setProjectItemsTemp}
        />
        {projectItem !== null ? (
          <ProjectItemDetailModal
            open={projectItemDetailModalOpen}
            toggle={toggleProjectItemDetailModal}
            project={project}
            projectItem={projectItem}
          />) : null}
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "90vh",
            overflow: "auto",
            width: "100%",
          }}
        >
          {project.ProjectID !== null ? (
            <>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="查核案件基本資料" />
                  <Tab label="查核項目排訂" />
                  <Tab label="查核" />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <Basic project={project} />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <ProjectItemList
                  toggleModal={toggleProjectItemAddModal}
                  project={project}
                  getItems={getItems}
                  projectItems={projectItems}
                  projectItemsTemp={projectItemsTemp}
                  setProjectItemsTemp={setProjectItemsTemp}
                  getProjectItems={getProjectItems}
                  postProjectItems={postProjectItems}
                  putProject={putProject}
                  deleteProjectItem={deleteProjectItem}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <ProjectItemCheckList
                  projectItems={projectItems}
                  setProjectItems={setProjectItems}
                  getProjectItem={getProjectItem}
                  putProjectItem={putProjectItem}
                  toggleDetailModal={toggleProjectItemDetailModal}
                  putProjectItemPhoto={putProjectItemPhoto}
                />
              </TabPanel>
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );
}
