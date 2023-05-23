import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import ProjectItemList from "./project/ProjectItemList";
import CreateProjectModal from "./project/CreateProjectModal";

export default function ProjectPage() {
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ "& .MuiFormControl-root": { marginRight: 2 } }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel htmlFor="grouped-native-select">機能組</InputLabel>
            <Select defaultValue="E" id="grouped-native-select" label="機能組">
              <MenuItem value="E">電儀(E)</MenuItem>
              <MenuItem value="R">轉機(R)</MenuItem>
              <MenuItem value="S">靜態(S)</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel htmlFor="grouped-native-select">受檢單位</InputLabel>
            <Select defaultValue="E" id="grouped-native-select" label="機能組">
              <MenuItem value="E">電儀(E)</MenuItem>
              <MenuItem value="R">轉機(R)</MenuItem>
              <MenuItem value="S">靜態(S)</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel htmlFor="grouped-native-select">機能組</InputLabel>
            <Select defaultValue="E" id="grouped-native-select" label="機能組">
              <MenuItem value="E">電儀(E)</MenuItem>
              <MenuItem value="R">轉機(R)</MenuItem>
              <MenuItem value="S">靜態(S)</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            新增查核案件
          </Button>
        </Box>
      </Box>
      <ProjectItemList />
      <CreateProjectModal open={modalOpen} />
    </>
  );
}
