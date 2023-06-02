import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ProjectListDrawer from "./project/ProjectListDrawer";
import ProjectItems from "./project/ProjectItems";

export default function ProjectPage() {
  const [project, setProject] = React.useState({});

  // Drawer
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <ProjectListDrawer
          open={drawerOpen}
          toggleDrawer={toggleDrawer}
          setProject={setProject}
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
            p: 3,
          }}
        >
          {project.ProjectID ? (
            <>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography sx={{ display: "inline" }}>經理室：</Typography>
                <Typography sx={{ display: "inline" }}>主管：</Typography>
                <Typography sx={{ display: "inline" }}>
                  受檢人員：{project.InspectedUser.UserName}
                </Typography>
                <Typography sx={{ display: "inline" }}>
                  查核人員：{project.Inspector.UserName}
                </Typography>
              </Box>
              <ProjectItems project={project} setProject={setProject}></ProjectItems>
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );
}
