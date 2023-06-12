import * as React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

Basic.propTypes = {
  project: PropTypes.object,
};

function Basic(props) {
  const { project } = props;
  const [isEdit, setIsEdit] = React.useState(false);
  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };
  return (
    <Box
      sx={{
        width: "40%",
        bgcolor: "background.paper",
        p: 4,
        "& .MuiTextField-root": { marginTop: 2, width: "100%" },
        "& .MuiFormControl-root": { marginTop: 2, width: "100%" },
      }}
    >
      <TextField
        id="projectNo"
        label="查核案號"
        disabled
        required
        value={project.ProjectNo}
      />
      <FormControl>
        <InputLabel id="projectTypeLabel" required>
          機能組
        </InputLabel>
        <Select
          id="projectType"
          label="projectType"
          disabled={!isEdit}
          value={project.ProjectType}
        >
          <MenuItem value={"E"}>電儀(E)</MenuItem>
          <MenuItem value={"R"}>轉機(R)</MenuItem>
          <MenuItem value={"S"}>靜態(S)</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="inspectedDepartment" required>
          受檢單位
        </InputLabel>
        <Select
          id="inspectedDepartment"
          label="inspectedDepartment"
          disabled={!isEdit}
          value={project.InspectedDepartment}
        >
          <MenuItem value={"H1"}>ARO1廠(H1)</MenuItem>
          <MenuItem value={"H2"}>ARO2廠(H2)</MenuItem>
          <MenuItem value={"H3"}>ARO3廠(H3)</MenuItem>
          <MenuItem value={"30"}>設保組(30)</MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"zh-cn"}>
        <DatePicker
          label="受檢日期"
          name="inspectedDate"
          disabled={!isEdit}
          required
          value={dayjs(project.InspectedDate)}
        />
      </LocalizationProvider>
      <TextField
        id="inspectedUser"
        label={isEdit ? "經辦NotesID" : "經辦"}
        disabled={!isEdit}
        required
        value={
          isEdit ? project.InspectedUser.NotesID : project.InspectedUser.Name
        }
      />
      <TextField
        id="supervisor"
        label={isEdit ? "主管NotesID" : "主管"}
        disabled={!isEdit}
        required
        value={isEdit ? project.Supervisor.NotesID : project.Supervisor.Name}
      />
      <TextField
        id="manager"
        disabled={!isEdit}
        label={isEdit ? "經理室專人NotesID" : "經理室專人"}
        required
        value={isEdit ? project.Manager.NotesID : project.Manager.Name}
      />
      <TextField
        id="inspector"
        disabled
        label="評核人員"
        required
        value={project.Inspector.Name}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          variant="contained"
          color={isEdit ? "success" : "warning"}
          disabled={project.IsScheduled}
          onClick={handleEditClick}
        >
          {isEdit ? "修改完成" : "修改基本資料"}
        </Button>
      </Box>
    </Box>
  );
}

export default Basic;
